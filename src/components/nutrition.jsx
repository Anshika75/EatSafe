import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const recommendedDailyValues = {
  'Calories': 2000,
  'Total Fat': 78,
  'Saturated Fat': 20,
  'Cholesterol': 300,
  'Sodium': 2300,
  'Total Carbohydrate': 275,
  'Dietary Fiber': 28,
  'Total Sugars': 50,
  'Protein': 50,
  'Vitamin D': 20,
  'Calcium': 1300,
  'Iron': 18,
  'Potassium': 4700,
};

const Nutrition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [comparisonResults, setComparisonResults] = useState({});

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setOcrText(text);
      const nutritionDict = parseNutritionLabel(text);
      const comparison = compareWithDailyValues(nutritionDict, recommendedDailyValues);
      setComparisonResults(comparison);
    });
  };

  const parseNutritionLabel = (text) => {
    const nutritionDict = {};
    const lines = text.split('\n');
    const regex = /(\D+):?\s+(\d+\.?\d*)/;

    lines.forEach((line) => {
      const match = regex.exec(line);
      if (match) {
        const nutrient = match[1].trim();
        const value = parseFloat(match[2].trim());
        nutritionDict[nutrient] = value;
      }
    });

    return nutritionDict;
  };

  const compareWithDailyValues = (nutritionDict, recommendedValues) => {
    const comparison = {};

    for (const [nutrient, value] of Object.entries(nutritionDict)) {
      if (recommendedValues[nutrient] !== undefined) {
        const dailyValue = recommendedValues[nutrient];
        const percentage = (value / dailyValue) * 100;
        comparison[nutrient] = percentage;
      }
    }

    return comparison;
  };

  return (
    <div className="App">
      <h1>Nutrition Value Checker</h1>
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" className="uploaded-image" />}
      {ocrText && (
        <div>
          <h2>OCR Text</h2>
          <pre>{ocrText}</pre>
        </div>
      )}
      {comparisonResults && (
        <div>
          <h2>Comparison with Daily Values</h2>
          <ul>
            {Object.entries(comparisonResults).map(([nutrient, percentage]) => (
              <li key={nutrient}>
                {nutrient}: {percentage.toFixed(2)}% of daily value
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
