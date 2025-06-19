import React, { useEffect, useState } from 'react'
import { GetSearchPlaces } from '@/service/GlobalAPI';

const InfoSection = ({ trip }) => {
  const [placePhoto, setPlacePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPhotoUrl = (photoName) => {
    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  };

  const getPlacePhoto = async () => {
    if (!trip?.userSelection?.location?.label) return;

    try {
      setLoading(true);
      setError(null);

      const response = await GetSearchPlaces({
        textQuery: trip.userSelection.location.label
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
    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {loading ? (
          <div className="animate-pulse bg-gray-200 h-64 w-full" />
        ) : error ? (
          <div className="bg-red-50 p-4 text-red-600">{error}</div>
        ) : placePhoto ? (
          <div className="relative h-64">
            <img
              src={placePhoto}
              alt={trip?.userSelection?.location?.label}
              className="w-full h-full object-cover"
              onError={() => setError('Failed to load image')}
            />
          </div>
        ) : (
          <div className="bg-gray-100 p-4 text-gray-500">
            No location information available
          </div>
        )}
      </div>
      <h2 className="mt-3 text-3xl font-bold">{trip?.userSelection?.location?.label}</h2>
    </div>
  );
};


export default InfoSection
