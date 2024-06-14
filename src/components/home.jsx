import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <p className='mulish text-sm text-[#80b3ba]'>Welcome To</p>
        <h1 className='titan-one text-[#2b7483] drop-shadow-md text-6xl'>EatSafe</h1>
        <p className='kanit text-[#193e4e] w-[90%] text-justify mt-4'>Easily scan the ingredient lists on food packages and instantly identify any harmful substances. Whether you're concerned about preservatives, artificial additives, or allergens, our app empowers you to make healthier and safer food choices.</p>
        <button className='mt-8 px-4 py-2 rounded-2xl bg-[#2b7483] w-[75%] text-center kanit text-white transition-all hover:opacity-75 cursor-pointer'>Scan</button>
        <p className='kanit my-2'>or</p>
        <a href="" className='kanit text-sm text-[#2b7483] underline cursor-pointer'>Upload</a>
    </div>
  )
}
