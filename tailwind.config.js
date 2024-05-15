/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'indigo':'#4B0082',
      'blackbg':'#090B11',
      'grey':'#c9cfdd',
      'blue': '#1fb6ff',
      'pink': '#7611A6',
      'red':'#FF0000',
      'orange': '#ff7849',
      'green': '#13ce66',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'blue-gradient': 'linear-gradient(to right, #1fb6ff, #2473ff)',
      'pink-gradient': 'linear-gradient(to right, #ff49db, #ff3d7e)',
      'orange-gradient': 'linear-gradient(to right, #ff7849, #ff5216)',
      'green-gradient': 'linear-gradient(to right, #13ce66, #0f8035)',
      'white': '#ffffff', // Blanc
      'black': '#000000', // Noir
      'purple': '#361F59', // Violet
      'purple2': '#483D8B', // Violet lite 
      'yellow': '#f6e05e', // Jaune
      'cyan': '#06b6d4', // Cyan
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideIn: 'slideIn 1s ease-in-out',
      },
    }
  },
  plugins: [],
}
