import React from 'react'
import { MdScreenShare } from "react-icons/md";
import Button from '../ui/Button';

const InfoSection = ({trip}) => {
  return (
    <div>
      <img className='h-[300px] w-full object-cover rounded-xl' src="/placeholder.jpg" alt="AITrips" />
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2 my-5'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️ {trip.userSelection?.days} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🍹 No. of Traveler: {trip.userSelection?.travelWith} People</h2>
            </div>           
        </div>            
      </div>
    </div>
  )
}

export default InfoSection
