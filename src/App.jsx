import { useState } from 'react'
import './App.css'
import Home from './components/home'
import Nutrition from './components/nutrition'

function App() {

  return (
    <>
      <div className="grid place-items-center w-full min-h-screen bg-[#F0EEEE]">
        <Nutrition/>
      </div>
    </>
  )
}

export default App
