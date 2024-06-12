import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // theme via: https://coolors.co/d8dbe2-a9bcd0-58a4b0-373f51-1b1b1e
    colors: {
      platinum: '#D8DBE2',
      blue: '#A9BCD0',
      moonstone: '#58A4B0',
      charcoal: '#373F51',
      black: '#1B1B1E',
    },
  },
  plugins: [],
};
export default config;
