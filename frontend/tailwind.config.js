module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        desk: {
          bg: '#0b1220',
          panel: '#111827',
          border: '#1f2937',
          accent: '#38bdf8',
          positive: '#22c55e',
          negative: '#f97316',
          warning: '#facc15',
        },
      },
    },
  },
  plugins: [],
};
