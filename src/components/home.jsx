import React, { useRef, useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [desc, setDesc] = useState('Easily scan the ingredient lists on food packages and instantly identify any harmful substances. Whether you are concerned about preservatives, artificial additives, or allergens, our app empowers you to make healthier and safer food choices.');
  const [recognizedText, setRecognizedText] = useState('');
  const [apiResponse, setApiResponse] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

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

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const result = await Tesseract.recognize(selectedImage);
        setRecognizedText(result.data.text);
        if (result.data.text) {
          try {
            const response = await fetch('https://programmervisit.com/api/check-food', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ rawData: result.data.text })
            });
            const data = await response.json();
            console.log({ data });
            console.log(data.message);
            setApiResponse(data);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      }
    };
    recognizeText();
  }, [selectedImage]);

  const handleReset = () => {
    setSelectedImage(null);
    setDesc('Easily scan the ingredient lists on food packages and instantly identify any harmful substances. Whether you are concerned about preservatives, artificial additives, or allergens, our app empowers you to make healthier and safer food choices.');
    setRecognizedText('');
    setApiResponse({});
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 relative bg-[#F0EEEE] w-full">
      <p className='mulish text-sm text-[#80b3ba]'>Welcome To</p>
      <h1 className='titan-one text-[#2b7483] drop-shadow-md text-6xl'>EatSafe</h1>
      <p className='kanit text-[#193e4e] w-[90%] text-justify mt-4'>
        {desc}
      </p>
      {selectedImage && (
        <div className="w-[250px] h-[250px] bg-[#80b3ba] grid place-items-center my-6 relative">
          <img
            src={selectedImage}
            alt="Selected"
            className='h-[240px] w-[240px] object-cover cursor-pointer'
            onClick={() => openModal(<img src={selectedImage} alt="Full Size" className="w-full" />)}
          />
          <i
            className="fa-solid fa-xmark text-white absolute top-1 right-1 bg-[#2b7483] p-1 rounded-full cursor-pointer"
            onClick={handleReset}
          ></i>
          <i
            className="fa-solid fa-info-circle text-[#2b7483] absolute bottom-1 right-1 p-1 rounded-full cursor-pointer z-20"
            onClick={() => openModal(recognizedText)}
          ></i>
        </div>
      )}
      {!selectedImage && (
        <>
          <button
            className='mt-2 px-4 py-2 rounded-2xl bg-[#2b7483] w-[75%] text-center kanit text-white transition-all hover:opacity-75 cursor-pointer'
            onClick={handleUploadClick}
          >
            Scan
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </button>
          <p className='kanit my-2'>or</p>
          <a onClick={handleUploadClick} className='kanit text-sm text-[#2b7483] underline cursor-pointer'>
            Upload
          </a>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <div className='bg-white p-4 w-[80%] rounded flex flex-col justify-center relative shadow-md mt-6 pt-6'>
        <h2 className='bg-[#2b7483] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-white py-1 rounded-full kanit'>Result:</h2>
        {apiResponse.data ? (
          <div>
            {apiResponse.data.map((item, index) => (
              <p className='mulish' key={index}>{item}</p>
            ))}
          </div>
        ) : (
          <p className='mulish'>{apiResponse.message}</p>
        )}
      </div>

      {isModalOpen && (
        <div className="absolute w-full min-h-full top-0 left-0 bg-black bg-opacity-50 flex items-start py-4 justify-center z-50">
          <div className="bg-white p-4 w-[80%] rounded flex flex-col justify-center relative shadow-md">
            <i
              className="fa-solid fa-xmark absolute top-0 right-0 text-xl cursor-pointer bg-[#2b7483] p-1 px-2 text-white"
              onClick={closeModal}
            ></i>
            <div className="mt-4 mulish">{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
