import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserMedia } from '../services/mediaService';

function Memories() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userMedia, setUserMedia] = useState(null);
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [hearts, setHearts] = useState([]);

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
  }, []);

  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const media = await getUserMedia();
        console.log('Fetched media:', media); // Debug log
        setUserMedia(media);
      } catch (error) {
        console.error('Error fetching media:', error);
        // Fallback to localStorage data if API fails
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData.memoryImages && userData.memoryImages.length > 0) {
          setUserMedia({
            images: userData.memoryImages.map(img => ({
              url: img.url,
              public_id: img.public_id,
              caption: img.caption || 'No caption',
              subtitle: img.subtitle || 'No subtitle'
            }))
          });
        }
      }
    };

    if (isUnlocked) {
      fetchUserMedia();
    }
  }, [isUnlocked]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % (userMedia?.images.length || 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + (userMedia?.images.length || 1)) % (userMedia?.images.length || 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const downloadMemory = (memory) => {
    // Create download functionality using the correct URL
    const link = document.createElement('a');
    link.href = memory.signedUrl || memory.url;
    link.download = `memory-${memory.caption || 'image'}.jpg`;
    link.click();
  };

  const handleContinue = () => {
    navigate('/celebrate');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float-up text-pink-400 opacity-70"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.animationDelay}s`,
              fontSize: `${heart.size}px`,
              animationDuration: '4s',
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 text-pink-500 text-xl sm:text-2xl animate-pulse">💕</div>
        <div className="absolute top-8 right-8 sm:top-20 sm:right-20 text-pink-400 text-2xl sm:text-3xl animate-bounce">💖</div>
        <div className="absolute bottom-20 left-4 sm:bottom-20 sm:left-20 text-pink-500 text-xl sm:text-2xl animate-pulse delay-1000">💕</div>
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 text-pink-400 text-2xl sm:text-3xl animate-bounce delay-500">💖</div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 px-4">
            Mirror of Memories
          </h1>
        </div>

        {/* Memory Container */}
        <div className="flex justify-center">
          {!isUnlocked ? (
            /* Locked State */
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg w-full mx-4">
              <div
                className="bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl p-16 sm:p-20 text-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleUnlock}
              >
                <div className="text-6xl sm:text-8xl mb-6 animate-heartbeat">💕</div>
                <p className="text-gray-600 font-medium text-base sm:text-lg">Click to unlock memories</p>
              </div>
            </div>
          ) : (
            /* Unlocked State - Horizontal Gallery */
            <div className="w-full animate-fade-in-scale">
              <div
                className="relative flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="absolute left-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                >
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Memory Cards Container */}
                <div className="flex items-center justify-center px-16 overflow-hidden relative">
                  {/* Left Side Blurred Memory */}
                  {activeIndex > 0 && (
                    <div className="absolute left-0 transform -translate-x-1/2 transition-all duration-500 ease-out scale-75 opacity-50 blur-sm">
                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl w-64 sm:w-80">
                        <div className="relative">
                          <img
                            src={userMedia?.images[activeIndex - 1]?.signedUrl || userMedia?.images[activeIndex - 1]?.url}
                            alt={userMedia?.images[activeIndex - 1]?.caption || 'Memory'}
                            className="w-full h-48 sm:h-64 object-cover transition-transform duration-500"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                            <p className="text-white font-medium text-xs sm:text-sm">
                              {userMedia?.images[activeIndex - 1]?.caption || 'Memory'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Center Active Memory */}
                  <div className="transition-all duration-500 ease-out transform scale-100 opacity-100 blur-0 z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl w-80 sm:w-96">
                      <div className="relative">
                        <img
                          src={userMedia?.images[activeIndex]?.signedUrl || userMedia?.images[activeIndex]?.url}
                          alt={userMedia?.images[activeIndex]?.caption || 'Special Memory'}
                          className="w-full h-64 sm:h-80 object-cover transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                          <p className="text-white font-medium text-sm sm:text-base">
                            {userMedia?.images[activeIndex]?.caption || 'Special Memory'}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 text-center">
                        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                          {userMedia?.images[activeIndex]?.subtitle || 'A beautiful moment captured'}
                        </p>
                        <button
                          onClick={() => downloadMemory(userMedia.images[activeIndex])}
                          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          💖 Download this memory
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Blurred Memory */}
                  {activeIndex < (userMedia?.images.length || 1) - 1 && (
                    <div className="absolute right-0 transform translate-x-1/2 transition-all duration-500 ease-out scale-75 opacity-50 blur-sm">
                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl w-64 sm:w-80">
                        <div className="relative">
                          <img
                            src={userMedia?.images[activeIndex + 1]?.signedUrl || userMedia?.images[activeIndex + 1]?.url}
                            alt={userMedia?.images[activeIndex + 1]?.caption || 'Memory'}
                            className="w-full h-48 sm:h-64 object-cover transition-transform duration-500"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                            <p className="text-white font-medium text-xs sm:text-sm">
                              {userMedia?.images[activeIndex + 1]?.caption || 'Memory'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="absolute right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                >
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Continue Button */}
              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Continue to Celebrate! 🎉
                </button>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {userMedia?.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-pink-600 scale-125'
                        : 'bg-pink-300 hover:bg-pink-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Memories;