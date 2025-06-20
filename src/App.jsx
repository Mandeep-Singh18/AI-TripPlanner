import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CreateTrip from './pages/CreateTrip'
import ViewTrip from './view-trip/[tripId]'
import MyTrips from './pages/MyTrips'



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/create-trip" element={<CreateTrip/>} />
        <Route path="/view-trip/:tripId" element={<ViewTrip/>} />
        <Route path="/my-trips" element={<MyTrips/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
