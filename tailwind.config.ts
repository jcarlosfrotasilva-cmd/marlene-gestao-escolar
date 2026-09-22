import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#dfeeff',
          200: '#bfdcff',
          300: '#8ebdff',
          400: '#599fff',
          500: '#2d73ff',
          600: '#1c5ce0',
          700: '#1b4ab5',
          800: '#1d3d8a',
          900: '#1d356f',
        },
        ink: '#0f172a',
        slate: '#e2e8f0',
        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
