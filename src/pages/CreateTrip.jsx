import Headerss from '@/components/custom/Headerss'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { db, generateTravelPlan } from '@/service/AIMODEL';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    // You can handle the form submission here
    setIsOpen(false)
  }

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  useEffect(() => {

  }, [formData]);

  const onGenerateTrip = async () => {

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setOpenDialog(true);
        return alert('Please login to generate a trip');
      }
      setLoading(true);
      if (!formData.location || !formData?.days || !formData?.budget || !formData?.travelWith) {
        alert('Please fill all fields');
        return;
      }
      const final_prompt = AI_PROMPT
        .replace('{location}', formData.location?.label || '')
        .replace('{totaldays}', formData.days || '')
        .replace('{traveler}', formData.travelWith || '')
        .replace('{budget}', formData.budget || '');

      const result = await generateTravelPlan(final_prompt);
      const responseText = await result?.response?.text();

      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        // Found JSON in the response
        SaveAITrip(jsonMatch[1]);
      } else {
        // No JSON found, save as plain text
        SaveAITrip(JSON.stringify({ itinerary: responseText }));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate travel plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAITrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    const parsedData = typeof TripData === 'string' ? JSON.parse(TripData) : TripData;

    await setDoc(doc(db, "UserTrips", docId), {
      userSelection: formData,
      tripData: parsedData,
      userEmail: user?.email,
      id: docId
    })
    navigate(`/view-trip/${docId}`);
  }

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      GetUserProfile(credentialResponse);
    },
    onError: (error) => {
      console.log("Login Failed: res:", error);
      alert("Login Failed. Please try again.");
    }
  });

  const GetUserProfile = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokeninfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        accept: 'application/json'
      }
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  return (
    <div>
      <Headerss />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5  mt-10">
        <h2 className='font-bold text-3xl'>Tell us your travel prefrences🌍</h2>
        <p className='mt-3 text-gray-500 text-lg'>just provide some basic information, and our trip planner will generate a customize itrenary based on your prefrences.</p>

        <div className='mt-10'>
          <div>
            <h2 className='text-xl my-3 font-medium'>what is destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleChange('location', v); },
              }}
            />
          </div>
        </div>

        <div className='mt-10'>
          <div>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
            <input className='px-3 py-2 w-full rounded  border border-gray-300' type="number" placeholder='Ex.3'
              onChange={(e) => handleChange('days', e.target.value)}
            />
          </div>
        </div>

        <div className='mt-10'>
          <h2 className='text-xl my-3 font-medium'>what is your Budget?</h2>
          <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${formData?.budget === item.title ? 'bg-gray-100' : ''}`
              }
                onClick={() => handleChange('budget', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-10'>
          <h2 className='text-xl my-3 font-medium'>who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer'
                ${formData?.travelWith === item.people ? 'bg-gray-100' : ''}`}
                onClick={() => handleChange('travelWith', item.people)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='my-10 justify-end flex'>
          <button disabled={loading}
            onClick={() => {
              const user = JSON.parse(localStorage.getItem('user'));
              if (!user) {
                setIsOpen(true); // Only open dialog if user is not logged in
              } else {
                onGenerateTrip(); // Directly generate trip if user is logged in
              }
            }}
            className='bg-black justify-end cursor-pointer text-white px-5 py-2 rounded mt-10 hover:bg-red-600 transition'>
            {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
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
      </div>
    </div>
  )
}


export default CreateTrip
