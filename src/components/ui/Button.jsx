import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Buttonsx = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      GetUserProfile(credentialResponse);
    },
    onError: (error) => {
      console.log("Login Failed: res:", error);
      alert("Login Failed. Please try again.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    // You can handle the form submission here
    setIsOpen(false)
  }

  const GetUserProfile = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokeninfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        accept: 'application/json'
      }
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      window.location.reload(); // Reload to reflect user login state
    })
  }

  return (
    <div>
      <button disabled={loading}
        onClick={() => {
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user) {
            setIsOpen(true); // Only open dialog if user is not logged in
          } else {
            onGenerateTrip(); // Directly generate trip if user is logged in
          }
        }}
        className='cursor-pointer bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-indigo-50 hover:text-indigo-700 transition'>
        {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "SignIn"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
          >
            <div className="mb-10">
              <img src="/logo.svg" alt="" />
              <h2 className="text-sm mt-5 font-bold text-gray-500">
                Sign in with your Google account to continue
              </h2>
            </div>


            <div className="mt-6 flex flex-col gap-3">

              <button
                type="submit"
                className="px-4 py-2 bg-black justify-center flex items-center gap-4 text-white rounded-md"
                onClick={login}
              >
                <FcGoogle />
                Sign In With Google
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-md text-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Buttonsx
