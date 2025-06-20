import React from 'react'
import { useNavigate } from 'react-router-dom';

function MyTrips() {
    useEffect(() => {
        GetUserDetails();
    }, [])

    const GetUserDetails = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const navigation = useNavigate();
        if (!user) {
            navigation('/');
            return;
        }
         
    }

    return (
        <div>
        My trips
        </div>
    )
}

export default MyTrips
