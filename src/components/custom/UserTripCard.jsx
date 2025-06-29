import { GetSearchPlaces } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
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

            if (response?.data?.places?.[0]?.photos?.[0]?.name) {
                const photoName = response.data.places[0].photos[0].name;
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
        <Link to={`/view-trip/${trip?.id}`} className='w-full h-full'>
            <div className='hover:scale-105 transition-all bg-gray-100 rounded-lg shadow-sm p-4 flex flex-col gap-3 cursor-pointer'>
                <div className="w-full h-[200px] overflow-hidden rounded-xl">
                    <img
                        src={placePhoto ? placePhoto : '/placeholder.jpg'}
                        className='w-full h-full object-cover rounded-xl'
                        alt=""
                    />
                </div>
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.days} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCard
