import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        aside: '264px',
      },
      maxWidth: {
        container: '960px',
        loginContainer: '500px',
        mainContainer: 'calc(100vw - 264px)',
        headerContainer: '992px',
      },
      maxHeight: {
        filesList: '200px',
      },
      minWidth: {
        xsMinWidth: '32px',
        profileDesktop: '96px',
        profileMobile: '56px',
      },
      minHeight: {
        xsMinHeght: '32px',
        profileDesktop: '96px',
        profileMobile: '56px',
      },
      screens: {
        md500: '500px',
      },
      fontSize: {
        xs10: ['10px', '12px'],
        xs12: ['12px', '16px'],
        s14: ['14px', '20px'],
        sm16: ['16px', '24px'],
        md20: ['20px', '28px'],
        md24: ['24px', '32px'],
        md26: ['26px', '36px'],
        l32: ['32px', '38px'],
        l36: ['36px', '40px'],
        xL40: ['40px', '52px'],
        xxL46: ['46px', 'normal'],
        lg64: ['64px', 'normal'],
      },
      backgroundColor: {
        asidePanel: '#343a40',
        mainBlue: '#027bff',
        mainGreen: '#218838',
        lightMain: '#e2e6ea',
        mainRed: '#df4553',
        inputPlaceholder: '#a1a3a7',
        blueHover: '#0069d9',
        blueBorderHover: '#0062cc',
      },
      colors: {
        black: '#212529',
        mainBLue: '#027bff',
        mainGreen: '#218838',
        lightMain: '#e2e6ea',
        mainRed: '#df4553',
        mainOrange: '#ffb000',
        grayBg: '#dee2e6',
        addBtnHover: '#cfd5db',
        actionBtnHover: '#e9ecef',
        greenBtnHover: '#a8d9b1',
        grayBtnHover: '#c0c4c7',
        grayMedium: '#6c757d',
        grayStrong: '#30353c',
        inputPlaceholder: '#a1a3a7',
        btnBlue: '#007bff',
        btnBlueHover: '#006fe6',
        btnRed: '#dc3545',
        btnRedHover: '#a71d2a',

        grayStroke: {
          100: '#596268',
          90: '#494e54',
          80: '#dde1e5',
          70: '#959ca1',
          60: '#dee2e6',
          50: '#e2e6ea',
          40: '#f8f9fa',
          30: '#e9ecef',
        },
      },
    },
  },
  plugins: [],
};
export default config;
