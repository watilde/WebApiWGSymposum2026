import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0066CC', dark: '#004499' },
        ohdsi: { blue: '#20588F', teal: '#1f7a8c', orange: '#E07B39' },
      },
    },
  },
  plugins: [],
};

export default config;
