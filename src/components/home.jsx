import React, { useRef, useState, useEffect } from 'react';

import Tesseract from 'tesseract.js';

export default function Home() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [desc, setDesc] = useState('Easily scan the ingredient lists on food packages and instantly identify any harmful substances. Whether you are concerned about preservatives, artificial additives, or allergens, our app empowers you to make healthier and safer food choices.');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setSelectedImage(URL.createObjectURL(file));
      setDesc(null);
    }
  };
  const [recognizedText, setRecognizedText] = useState('');
  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const result = await Tesseract.recognize(selectedImage);
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [selectedImage]);

  const handleReset = () => {
    setSelectedImage(null);
    setDesc('Easily scan the ingredient lists on food packages and instantly identify any harmful substances. Whether you are concerned about preservatives, artificial additives, or allergens, our app empowers you to make healthier and safer food choices.');
    setRecognizedText('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[400px] py-6">
      <p className='mulish text-sm text-[#80b3ba]'>Welcome To</p>
      <h1 className='titan-one text-[#2b7483] drop-shadow-md text-6xl'>EatSafe</h1>
      <p className='kanit text-[#193e4e] w-[90%] text-justify mt-4'>
        {desc}
      </p>
      {selectedImage && (
        <div className="w-[250px] h-[250px] bg-[#80b3ba] grid place-items-center my-6 relative">
          <img src={selectedImage} alt="Selected" className='w-[90%] h-[90%] object-cover' />
          <i
            className="fa-solid fa-xmark text-white absolute top-1 right-1 bg-[#2b7483] p-1 rounded-full cursor-pointer"
            onClick={handleReset}
          ></i>
        </div>
      )}
      <button className='mt-2 px-4 py-2 rounded-2xl bg-[#2b7483] w-[75%] text-center kanit text-white transition-all hover:opacity-75 cursor-pointer'>
        Scan
      </button>
      <p className='kanit my-2'>or</p>
      <a onClick={handleUploadClick} className='kanit text-sm text-[#2b7483] underline cursor-pointer'>
        Upload
      </a>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <div>
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
    </div>
  );
}
