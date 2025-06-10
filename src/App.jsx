import { useState } from 'react'

import Button from './components/ui/button'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CreateTrip from './pages/CreateTrip'



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/create-trip" element={<CreateTrip/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
