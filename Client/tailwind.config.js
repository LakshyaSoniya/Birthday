/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-scale': 'fadeInScale 1s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'bounce': 'bounce 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'text-glow': 'textGlow 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'float-up': 'floatUp 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'sprinkle-left': 'sprinkleLeft 3s ease-in-out infinite',
        'sprinkle-right': 'sprinkleRight 3s ease-in-out infinite',
        'balloon-up': 'balloonUp 5s ease-out forwards',
        'sprinkle-rb-lt': 'sprinkleRbLt 4s ease-out infinite',
        'sprinkle-lb-rt': 'sprinkleLbRt 4s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(50px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' },
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(236, 72, 153, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(236, 72, 153, 0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(100vh) rotate(0deg)' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-100vh) rotate(360deg)' },
        },
        sprinkleLeft: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(-50px) rotate(360deg)', opacity: '0' },
        },
        sprinkleRight: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(50px) rotate(-360deg)', opacity: '0' },
        },
        balloonUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-120vh) rotate(10deg)', opacity: '0' },
        },
        sprinkleRbLt: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(-100vw, -100vh) rotate(360deg)', opacity: '0' },
        },
        sprinkleLbRt: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(100vw, -100vh) rotate(-360deg)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}

