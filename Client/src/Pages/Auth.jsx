import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Auth = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${import.meta.env.VITE_URL}/api/users/login`, formData);
    if (response.status !== 200) {
      setError('Login failed! Please try again. 💔')
      setSuccess(false) 
      return
    };
    setSuccess(true);
    setError('');
    setTimeout(() => {
      alert('🎉 Happy Birthday! Login Successful! 🎂');
    }, 500);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    navigate('/home'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] text-3xl animate-bounce">💖</div>
        <div className="absolute top-[20%] right-[20%] text-3xl animate-bounce delay-1000">💕</div>
        <div className="absolute bottom-[15%] left-[10%] text-3xl animate-bounce delay-2000">💗</div>
        <div className="absolute top-[30%] right-[10%] text-3xl animate-bounce delay-500">🎈</div>
        <div className="absolute bottom-[30%] right-[15%] text-3xl animate-bounce delay-1500">🎈</div>
        <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-3xl animate-bounce delay-2500">🎂</div>
        <div className="absolute top-[40%] left-[20%] text-2xl animate-pulse">✨</div>
        <div className="absolute top-[60%] right-[25%] text-xl animate-pulse delay-1000">✨</div>
        <div className="absolute bottom-[40%] left-[40%] text-2xl animate-pulse delay-500">✨</div>
      </div>

      <div className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border-2 border-pink-200/50 max-w-md w-[90%] animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-pink-600 text-3xl font-bold mb-2 drop-shadow-lg">🌸 Happy Birthday! 🌸</h1>
          <p className="text-pink-500 text-lg font-medium">Welcome to your special day</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-pink-600 font-semibold text-sm block">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl text-base transition-all duration-300 bg-pink-50/80 focus:outline-none focus:border-pink-400 focus:bg-pink-50 focus:ring-2 focus:ring-pink-200 placeholder-pink-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-pink-600 font-semibold text-sm block">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl text-base transition-all duration-300 bg-pink-50/80 focus:outline-none focus:border-pink-400 focus:bg-pink-50 focus:ring-2 focus:ring-pink-200 placeholder-pink-400"
            />
          </div>

          {error && <div className="text-red-600 text-sm text-center p-2 bg-red-50 border border-red-200 rounded-lg">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center p-2 bg-green-50 border border-green-200 rounded-lg">🎉 Welcome! 🎉</div>}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white py-3 px-8 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:from-pink-500 hover:to-pink-700 active:translate-y-0"
          >
            🎁 Enter Birthday Celebration 🎁
          </button>
        </form>

        <div className="text-center mt-6 p-4 bg-pink-100/50 border border-pink-200/50 rounded-xl">
          <p className="text-pink-600 font-medium text-sm">🎂 Wishing you a day filled with happiness! 🎂</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
