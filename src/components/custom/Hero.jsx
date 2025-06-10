import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
   <section className="flex items-center justify-center min-h-screen px-4 bg-white">
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-red-500 mb-2">
          Discover Your Next Adventure with AI:
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-4">
          Personalized Itineraries at Your Fingertips
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <button className="bg-black cursor-pointer text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition">
            Get Started, It's Free
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Hero
