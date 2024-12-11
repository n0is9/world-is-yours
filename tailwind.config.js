/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],

  theme: {
    extend: {
      spacing: {
        170: '170px',
        150: '150px',
        285: '285px',
        70: '70px',
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '5/5': '100%',
      },
      margin: {
        50: '50px',
      },
      dropShadow: {
        '5xl': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        custom: {
          black: '#202020',
          blue: '#135CFB',
        },
        grayLight: '#C2C1C1',
        grayDark: '#202020',
        gray: '#888888',
        blue: '#135CFB',
        textLight: '#515151',
        darkGrey: '#515151',
      },
      borderColor: {
        black: '#202020',
      },
      width: {
        49: '49%',
        21: '21rem',
        22: '22rem',
        100: '26rem',
        30: '30rem',
        75: '7.5rem',
        '9r': '9rem',
        500: '500px',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '5/5': '100%',
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      height: {
        504: '504px',
        75: '7.5rem',
        100: '26rem',
      },
      minWidth: {
        235: '235px',
        500: '500px',
      },
      backgroundImage: {
        header: "url('./assets/img/bg-header.png')",
        page404: "url('./assets/icons/notFound404.png')",
      },
      backgroundColor: {
        'gray-dark': '#202020',
      },
      fontFamily: {
        // inter: ["Inter", "sans"],
        raleway: ['Raleway', 'sans'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      fontSize: {
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '21px': '21px',
        '25px': '25px',
        '30px': '30px',
        '35px': '35px',
        '40px': '40px',
        '50px': '50px',
      },
      screens: {
        min: '320px',
        sm: '480px',
        md: '768px',
        xl: '1280px',
        xxl: '1752px',

        smOnly: { max: '767.98px' },
        mdOnly: { min: '768px', max: '1279.98px' },
        notXl: { max: '1279.98px' },
        mediaHover: { raw: '(hover: hover)' },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '1.5rem',
          md: '5.25rem',
          xl: '2rem',
          xxl: '2rem',
        },
      },
      maxHeight: {
        52: '520px',
      },
      overflowY: {
        auto: 'auto',
      },
    },
  },
  plugins: [],
};
