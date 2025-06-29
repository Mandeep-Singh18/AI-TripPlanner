import React, { useState } from 'react'
import Headerss from '@/components/custom/Headerss'
import { Link } from 'react-router-dom'

// Placeholder icons (replace with your own or from react-icons)
const Sparkles = (props) => <span {...props}>✨</span>
const Clock = (props) => <span {...props}>⏰</span>
const Heart = (props) => <span {...props}>❤️</span>
const Award = (props) => <span {...props}>🏆</span>
const Plane = (props) => <span {...props}>✈️</span>
const ArrowRight = (props) => <span {...props}>→</span>
const Globe = (props) => <span {...props}>🌐</span>
const Camera = (props) => <span {...props}>📷</span>
const Separator = ({ className }) => <hr className={className} />

// Simple Badge component
const Badge = ({ children, className = "" }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${className}`}>{children}</span>
);

// Simple Button component (replace with your own if needed)
const Button = ({ children, className = "", variant, size, ...props }) => (
  <button
    className={`rounded-full font-semibold transition ${variant === "outline" ? "border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50" : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"} ${size === "lg" ? "px-8 py-4 text-lg h-14" : "px-5 py-2"} ${className}`}
    {...props}
  >
    {children}
  </button>
);

// FeatureCard component
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6">
    <div className="flex-shrink-0 text-emerald-600 text-3xl">{icon}</div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
);

// DestinationCard component
const DestinationCard = ({ name, image, rating, price, description }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-lg">{name}</h4>
        <span className="text-emerald-600 font-semibold">{rating}★</span>
      </div>
      <p className="text-slate-600 text-sm mb-3 flex-1">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-semibold text-emerald-700">{price}</span>
        <Button size="sm" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-1 text-sm">View</Button>
      </div>
    </div>
  </div>
);

const Homepage = () => {
  const [isPlanning, setIsPlanning] = useState(false);

  const popularDestinations = [
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500&h=300&fit=crop",
      rating: 4.8,
      price: "$1,200",
      description: "Romantic city with iconic landmarks and world-class cuisine"
    },
    {
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop",
      rating: 4.9,
      price: "$1,800",
      description: "Vibrant metropolis blending ancient traditions with cutting-edge technology"
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop",
      rating: 4.7,
      price: "$800",
      description: "Tropical paradise with stunning beaches and rich cultural heritage"
    },
    {
      name: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop",
      rating: 4.6,
      price: "$1,500",
      description: "The city that never sleeps, filled with endless possibilities"
    },
    {
      name: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop",
      rating: 4.8,
      price: "$2,000",
      description: "Futuristic cityscape with luxury shopping and desert adventures"
    },
    {
      name: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=300&fit=crop",
      rating: 4.7,
      price: "$1,100",
      description: "Eternal city where history comes alive at every corner"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="h-7 w-7" />,
      title: "AI-Powered Magic",
      description: "Our advanced AI creates personalized itineraries that perfectly match your style and budget in seconds."
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Lightning Fast",
      description: "Plan complex multi-day trips in under 2 minutes. No more hours of research and planning."
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: "Hidden Treasures",
      description: "Discover secret local spots, hidden gems, and authentic experiences that guidebooks miss."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Expert Insights",
      description: "Get recommendations from travel experts and locals who know the destinations inside out."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Headerss />
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-200">
              Why Choose AI Trip Planner
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Travel Planning Made 
              <span className="text-indigo-600"> Effortless</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
             Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.1"><circle cx="20" cy="20" r="2"/></g></g></svg>')}")`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4">Discover Your Next Adventure with AI</h3>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who trust AI Trip Planner for their perfect adventures
              </p>
              <Link to={'/create-trip'}>
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg shadow-lg cursor-pointer"
                  onClick={() => setIsPlanning(true)}
                >
                  Start Planning Now
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section id="destinations" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
              Popular Destinations
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Trending Travel 
              <span className="text-indigo-600"> Destinations</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the most loved destinations by our community of travelers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Plane className="h-5 w-5 text-white transform rotate-45" />
                </div>
                <span className="text-2xl font-bold">AI Trip Planner</span>
              </div>
              <p className="text-slate-400 text-lg mb-6 max-w-md">
                Transform your travel dreams into reality with AI-powered trip planning that understands your unique style.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                  <Camera className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-slate-800" />
          
          <div className="flex flex-col md:flex-row items-center justify-between text-slate-400">
            <p>&copy; 2025 AI Trip Planner. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Made with ❤️ for travelers worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;