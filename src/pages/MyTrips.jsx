import Headerss from '@/components/custom/Headerss';
import UserTripCard from '@/components/custom/UserTripCard';
import { db } from '@/service/AIMODEL';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyTrips() {
    const navigation = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserDetails();
    }, [])

    // Fetch user details and trips from Firestore
    const GetUserDetails = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
       
        const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            setUserTrips((prevTrips) => [...prevTrips, { ...doc.data(), id: doc.id }]);
        });
        setLoading(false);
    }

    // Skeleton card component
    const SkeletonCard = () => (
        <div className="animate-pulse bg-white shadow p-4 flex flex-col">
            <div className="bg-gray-200 h-[200px] w-full rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    );

    return (
        <div>
            <Headerss />
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5  mt-10'>
                <h2 className='font-bold text-3xl'>My Trips</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5'>
                   {loading
                        ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
                        : userTrips.map((trip) => (
                            <UserTripCard key={trip.id} trip={trip} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyTrips
