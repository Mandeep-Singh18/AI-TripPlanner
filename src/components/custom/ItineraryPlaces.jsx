import React from 'react'

function ItineraryPlaces({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-md font-semibold'>Day -{item?.day}</h2>
            {item?.activities.map((act, actindex) => (
              <div key={actindex} className='my-2 p-3 border rounded-lg shadow-sm'>
                <h2 className='my-2 font-medium text-sm text-orange-500'>{act?.time}</h2>
                <h2>{act.activity}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItineraryPlaces
