import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({place}) => {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.location} target="_blank">
        <div className='flex gap-5 items-center p-3 border border-gray-300 rounded-xl shadow-sm hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
        <img className='h-[130px] w-[130px] rounded-xl' src="/placeholder.jpg" alt="" />
        <div>
            <h2 className='font-bold text-lg'>{place.activity}</h2>
            <p className='text-sm text-gray-500'>{place.description}</p>
            <h2 >🕒 {place.time_travel}</h2>
        </div>
        </div>
    </Link>
  )
}

export default PlaceCard
