import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);
  const [showSprinkles, setShowSprinkles] = useState(true);

  useEffect(() => {
    // Create floating hearts animation
    const createHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          size: Math.random() * 20 + 15,
        });
      }
      setHearts(newHearts);
    };

    createHearts();

    // = setTimeout(() Home
    //   setShowSprinkles(false);
    // }, 5000);

    // return () => clearTimeout(timer);
  }, []);

  const Home = JSON.parse(localStorage.getItem('user')).Home;
  if(Home === null || Home === undefined) { 
    return (
      <div className="text-center text-red-500">
        No home data found! Please create a birthday surprise first.
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 flex items-center justify-center relative overflow-hidden">
      {/* Sprinkles Animation */}
      {showSprinkles && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Right Bottom to Left Top Sprinkles */}
          {Array.from({ length: 300 }, (_, i) => (
            <div
              key={`rb-lt-${i}`}
              className="absolute w-2 h-2 animate-sprinkle-rb-lt"
              style={{
                right: `${Math.random() * 50}%`,
                bottom: `${Math.random() * 50}%`,
                backgroundColor: ['#ff69b4', '#ffd700', '#00bfff', '#98fb98', '#ff6347', '#9370db', '#ff1493'][Math.floor(Math.random() * 7)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 10}s`
              }}
            />
          ))}
          
          {/* Left Bottom to Right Top Sprinkles */}
          {Array.from({ length: 300 }, (_, i) => (
            <div
              key={`lb-rt-${i}`}
              className="absolute w-2 h-2 animate-sprinkle-lb-rt"
              style={{
                left: `${Math.random() * 30}%`,
                bottom: `${Math.random() * 30}%`,
                backgroundColor: ['#ff69b4', '#ffd700', '#00bfff', '#98fb98', '#ff6347', '#9370db', '#ff1493'][Math.floor(Math.random() * 7)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float-up text-pink-400 opacity-70"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.animationDelay}s`,
              fontSize: `${heart.size}px`,
              animationDuration: '6s',
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-4xl animate-pulse">🎀</div>
      <div className="absolute top-20 right-20 text-3xl animate-bounce">🌸</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse delay-1000">💝</div>
      <div className="absolute bottom-10 right-10 text-3xl animate-bounce delay-500">🎈</div>
      
      {/* Music Note */}
      <div className="absolute bottom-10 right-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg animate-pulse">
        <div className="text-2xl">🎵</div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl max-w-2xl w-[90%] text-center relative animate-fade-in-scale">
        {/* Title */}
        <h1 className="text-5xl font-bold text-pink-400 mb-8 animate-text-glow">
          {Home.title}
        </h1>

        {/* Heart Icons */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="text-4xl animate-heartbeat">💖</div>
          <div className="text-4xl animate-heartbeat delay-300">💕</div>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl text-pink-600 mb-8 font-medium animate-fade-in-up delay-500">
           {Home.subtitle}
        </h2>

        {/* Message */}
        <p className="text-lg text-pink-500 mb-10 leading-relaxed animate-fade-in-up delay-700">
          "{Home.message}"
         </p>

        {/* Begin Surprise Button */}
        <button 
          onClick={()=>{navigate('/memories')}}
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
        >
          Begin Your Surprise! 🎁
        </button>

      </div>

      {/* Additional Floating Elements */}
      <div className="absolute top-1/4 left-1/4 text-2xl animate-spin-slow">✨</div>
      <div className="absolute top-1/3 right-1/3 text-3xl animate-spin-slow delay-1000">⭐</div>
      <div className="absolute bottom-1/4 left-1/3 text-2xl animate-spin-slow delay-2000">💫</div>
    </div>
  );
};

export default Home;
