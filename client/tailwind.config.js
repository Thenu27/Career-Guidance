/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}", 
  ],
  theme: {
    extend: {
      screens: {
        's8':{min:'310px',max:'360px'},
        'se': { min: '361px', max: '380px' },
        'ip12': { min: '381px', max: '410px' },
        'ipxr': { min: '411px', max: '450px' },
        'imini':{min:'456px', max:'768px'},
        'ipadAir': { min: '769px', max: '1180px' }
       
      },
    }, 
  },
  plugins: [],
};
