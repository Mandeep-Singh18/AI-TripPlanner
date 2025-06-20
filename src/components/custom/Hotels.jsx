import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotels Recommendation</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
            <HotelCardItem hotel={hotel} key={hotel.id || index}/>
        ))}
      </div>
    </div>
  )
} 

export default Hotels
