import React, { useEffect } from 'react'
import Button from '../ui/Button'
import UserAvatar from './UseAvatar';
import { googleLogout } from '@react-oauth/google';
import Buttonsx from '../ui/Button';

const Headerss = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {

  }, []);
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className='flex items-center justify-between p-4 bg-red-400 text-white'>
      <img src="/logo.svg" alt="" />
      {user ?
        <div className='flex items-center gap-4'>
            <button className='bg-white text-red-400 px-4 cursor-pointer py-2 rounded-full'>My Trips</button>
            <UserAvatar user={user} onLogout={handleLogout}/>
        </div> : <Buttonsx />}
    </div>
  )
}

export default Headerss
