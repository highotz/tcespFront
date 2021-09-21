import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    background: #edf2f4;
    display: flex;
    font-family: "Poppins";
    height: 100vh;
    text-rendering: optimizeLegibility;
  }
  `;
