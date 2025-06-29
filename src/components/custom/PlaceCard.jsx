import { GetSearchPlaces } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({ place }) => {
  const [placePhoto, setPlacePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPhotoUrl = (photoName) => {
    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  };

  const getPlacePhoto = async () => {
    if (!place?.location) return;

    try {
      setLoading(true);
      setError(null);

      const response = await GetSearchPlaces({
        textQuery: place?.location
      });

      if (response?.data?.places?.[0]?.photos?.[1]?.name) {
        const photoName = response.data.places[0].photos[1].name;
        const photoUrl = getPhotoUrl(photoName);
        setPlacePhoto(photoUrl);
      } else {
        setError('No photos available for this location');
      }
    } catch (err) {
      console.error('Failed to fetch place photo:', err);
      setError('Failed to load place photo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (place) {
      getPlacePhoto();
    }
  }, [place]);
  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location)}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className='flex gap-5 bg-gray-100 items-center p-3 rounded-xl shadow-sm hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
        {loading ? (
          <div className="h-[130px] w-[130px] rounded-xl bg-gray-200 animate-pulse" />
        ) : (
          <img 
            className='h-[130px] w-[130px] rounded-xl object-cover'
            src={placePhoto || '/placeholder.jpg'}
            alt={`${place.activity} location`}
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
              e.target.alt = 'Location image unavailable';
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <h2 className='font-bold text-lg truncate'>{place.activity || 'Activity Unavailable'}</h2>
          <p className='text-sm text-gray-500 line-clamp-2'>{place.description || 'No description available'}</p>
          <h2 className="mt-2 text-sm text-gray-600">💲 {place.ticket_pricing}</h2>
          <h2 className="mt-1 text-sm">🕒 {place.travel_time || 'Time not specified'}</h2>
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default PlaceCard
