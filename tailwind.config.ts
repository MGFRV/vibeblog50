import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C3A',
        accent: '#C87533',
        background: '#F5F7F4',
        text: '#1A2E26',
        surface: '#FFFFFF'
      }
    }
  },
  plugins: []
};

export default config;
