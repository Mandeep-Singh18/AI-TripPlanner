import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotels Recommendation</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.HotelName+","+ hotel?.HotelAddress} target="_blank">
              <div className='hover:scale-105 transition-all  cursor-pointer' key={index}>
                  <img className='rounded-lg w-full h-48 object-cover' src="/placeholder.jpg" alt="" />
                  <div className='my-2 flex flex-col gap-2'>
                      <h2 className='font-medium'>{hotel?.HotelName}</h2>
                      <h2 className='text-xs text-gray-500'>📍 {hotel?.HotelAddress}</h2>
                      <h2 className='text-sm'>💰 {hotel?.Price}</h2>
                      <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
                  </div>  
              </div>
            </Link>
        ))}
      </div>
    </div>
  )
} 

export default Hotels
