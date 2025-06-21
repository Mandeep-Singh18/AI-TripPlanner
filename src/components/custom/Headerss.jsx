import React, { useEffect } from 'react'
import Button from '../ui/Button'
import UserAvatar from './UseAvatar';
import { googleLogout } from '@react-oauth/google';
import Buttonsx from '../ui/Button';
import { Link } from 'react-router-dom';

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
    <header className="bg-transparent shadow-md">
    <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.svg" alt="Trip Planner Logo" className="h-10 w-10 rounded-full shadow" />
        <span className="font-extrabold text-xl tracking-tight text-gray-800 drop-shadow-lg hidden sm:inline">AI Trip Planner</span>
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/create-trip">
            <button className="cursor-pointer bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-indigo-50 hover:text-indigo-700 transition">
              + Create Trip
            </button>
          </Link>
          <Link to="/my-trips">
            <button className="cursor-pointer bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-indigo-50 hover:text-indigo-700 transition">
              My Trips
            </button>
          </Link>
          <UserAvatar user={user} onLogout={handleLogout} />
        </div>
      ) : (
        <Buttonsx />
      )}
    </div>
  </header>
  )
}

export default Headerss
