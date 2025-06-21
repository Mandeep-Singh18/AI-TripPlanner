import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
   <section className="relative flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-100 rounded-full blur-2xl opacity-60 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-100 rounded-full blur-xl opacity-30 -z-10"></div>

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 mb-4 drop-shadow-lg">
          Discover Your Next Adventure with AI
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Personalized Itineraries at Your Fingertips
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-10">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:from-pink-500 hover:to-indigo-500 transition-all duration-200">
            Get Started, It's Free
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Hero
