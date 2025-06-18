import React from 'react'
import PlaceCard from './PlaceCard'

function ItineraryPlaces({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className='mt-5'>
            <h2 className='text-md font-semibold'>Day -{item?.day}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
              {item?.activities.map((activity, actindex) => (
                <div key={actindex}>
                  <h2 className='my-2 font-medium text-sm text-orange-500'>{activity?.time}</h2>
                  <PlaceCard place = {activity}/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItineraryPlaces
