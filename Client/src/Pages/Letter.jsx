import React from 'react';

function Letter() {
  let letter = null;
  
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    letter = userData?.letter;
    console.log(letter);
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }
  
  if (!letter) {
    return <div className="text-center text-red-500">No letter data found!</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-400 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Colorful shapes */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-pink-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-5 h-5 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-12 w-4 h-4 bg-yellow-300 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-32 left-32 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-40 right-40 w-4 h-4 bg-orange-300 rounded-full animate-bounce delay-1500"></div>
        
        {/* Large decorative circles */}
        <div className="absolute top-20 left-0 w-32 h-32 bg-yellow-400 rounded-full opacity-20 -translate-x-16"></div>
        <div className="absolute bottom-20 right-0 w-40 h-40 bg-cyan-400 rounded-full opacity-30 translate-x-16"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Letter Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-scale">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 px-6 py-4 text-center">
            <h1 className="text-white text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
              <i>
                {letter.title}
              </i>
            </h1>
          </div>

          {/* Letter Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Greeting */}
            <h2 className="text-purple-600 text-2xl sm:text-3xl font-bold mb-6 text-center">
              <i>
                {letter.greeting}
              </i>
            </h2>
            <div className="w-16 h-1 bg-purple-400 mx-auto mb-8"></div>

            {/* Letter Body */}
            <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              {letter.body && letter.body.length > 0 ? (
                letter.body.map((val, index) => {
                  return (
                    <p key={index} className="mb-4">{val}</p>
                  )
                })
              ) : (
                <div className="text-center text-gray-500 italic py-4">
                  <p>No letter content available</p>
                </div>
              )}

              {/* Special Message */}
              <div className="text-center py-6">
                <p className="text-pink-500 text-lg sm:text-xl font-semibold italic">
                  {letter.specialMessage}🎂 🎈
                </p>
              </div>

              {/* Signature */}
              <div className="text-center pt-4">
                <p className="text-purple-600 font-medium italic">
                  {letter.signature}
                </p>
              </div>
              <div className="text-center pt-2">
                <p className="text-purple-600 font-medium italic">
                  {letter.signatureName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements around the letter */}
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🎈</div>
        <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">🎁</div>
        <div className="absolute top-1/2 -left-8 text-3xl animate-bounce delay-1000">🌟</div>
        <div className="absolute top-1/4 -right-8 text-3xl animate-pulse delay-500">💖</div>
      </div>
    </div>
  );
}

export default Letter;