import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.png';
import B1 from '../assets/B1.png';
import B2 from '../assets/B2.png';
import B3 from '../assets/B3.png';
import B4 from '../assets/B4.png';
import B5 from '../assets/B5.png';

function Celebrate() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const navigate = useNavigate();

  const balloonImages = [B1, B2, B3, B4, B5];

  const handleCakeClick = () => {
    setIsCelebrating(true);
  };

  const handleContinue = () => {
    navigate('/letter');
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isCelebrating ? 'bg-white' : 'bg-gradient-to-br from-pink-200 to-pink-400'
    } flex flex-col items-center justify-center relative overflow-hidden`}>
      
      {/* Animated Sprinkles */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Left to Down Sprinkles */}
          {Array.from({ length:200 }, (_, i) => (
            <div
              key={`left-${i}`}
              className="absolute w-2 h-2 animate-sprinkle-left"
              style={{
                left: `${Math.random() * 50}%`,
                top: `${Math.random() * 20}%`,
                backgroundColor: ['#ff69b4', '#ffd700', '#00bfff', '#98fb98', '#ff6347'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Right to Down Sprinkles */}
          {Array.from({ length: 200 }, (_, i) => (
            <div
              key={`right-${i}`}
              className="absolute w-2 h-2 animate-sprinkle-right"
              style={{
                right: `${Math.random() * 50}%`,
                top: `${Math.random() * 20}%`,
                backgroundColor: ['#ff69b4', '#ffd700', '#00bfff', '#98fb98', '#ff6347'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={`balloon-${i}`}
            className={`absolute animate-balloon-up transition-opacity duration-1000 ${
              isCelebrating ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${5 + Math.random() * 90}%`,
              bottom: '0%',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            <img 
              src={balloonImages[Math.floor(Math.random() * balloonImages.length)]} 
              alt="balloon" 
              className="w-12 h-16 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center">
        <span className="text-pink-500">Let's </span>
        <span className="text-purple-500">Celebrate</span>
        <span className="text-pink-500">! </span>
        <span className="text-2xl">🎂</span>
      </h1>

      {/* Cake Container */}
      <div className="relative mb-8">
        {/* Cake */}
        <div 
          className={`cursor-pointer transition-all duration-500 transform hover:scale-110 ${
            isCelebrating ? 'animate-bounce' : ''
          }`}
          onClick={handleCakeClick}
        >
          <img 
            src={cake} 
            alt="Birthday Cake" 
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
          />
        </div>
      </div>

      {/* Continue Button */}
      {isCelebrating && (
        <button
          onClick={handleContinue}
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
        >
          Continue to Next Page →
        </button>
      )}

      {/* Click instruction */}
      {!isCelebrating && (
        <p className="text-gray-600 text-lg mt-4 animate-pulse">
          Click on the cake to celebrate! 🎉
        </p>
      )}
    </div>
  );
}

export default Celebrate;