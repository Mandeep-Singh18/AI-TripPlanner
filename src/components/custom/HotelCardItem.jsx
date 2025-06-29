import { GetSearchPlaces } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel}) {
    const [placePhoto, setPlacePhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPhotoUrl = (photoName) => {
        return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
    };

    const getPlacePhoto = async () => {
        if (!hotel?.HotelName) return;

        try {
            setLoading(true);
            setError(null);

            const response = await GetSearchPlaces({
                textQuery: hotel?.HotelName
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
        if (hotel) {
            getPlacePhoto();
        }
    }, [hotel]);
    return (
        <Link 
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.HotelName + "," + hotel?.HotelAddress)}`} 
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className='hover:scale-105 bg-gray-100 transition-all cursor-pointer p-4 rounded-lg shadow-sm'>
                {loading ? (
                    <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg" />
                ) : (
                    <img 
                        className='rounded-lg w-full h-48 object-cover'
                        src={placePhoto}
                        alt={hotel?.HotelName || 'Hotel image'}
                        onError={(e) => {
                            e.target.src = '/placeholder.jpg';
                            e.target.alt = 'Hotel image unavailable';
                        }}
                    />
                )}
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.HotelName || 'Hotel Name Unavailable'}</h2>
                    <h2 className='text-xs text-gray-500'>
                        📍 {hotel?.HotelAddress || 'Address Unavailable'}
                    </h2>
                    <h2 className='text-sm'>💰 {hotel?.Price || 'Price Unavailable'}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating || 'N/A'}</h2>
                    {error && (
                        <p className="text-xs text-red-500">{error}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem
