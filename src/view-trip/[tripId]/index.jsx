import Headerss from '@/components/custom/Headerss'
import { db } from '@/service/AIMODEL';
import { doc, getDoc } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewTrip = () => {
const {tripId } = useParams();
const [tripData, setTripData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    tripId&&getTripData();
}, [tripId]);

// Function to fetch trip data from Firestore database
const getTripData = async () => {
    const docref = doc(db, 'UserTrips', tripId);
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
        setTripData(docSnap.data());
        setLoading(false);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        alert('No such trip found');
        setLoading(false);
    }
} 

return (
    <div>
    <Headerss />
    <div>
        {/* Information Section */}
    </div>
    </div>
  )
}

export default ViewTrip
