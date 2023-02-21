import { createGlobalStyle } from "styled-components";
//O comportamento do estilo da página
const Global = createGlobalStyle`
body {  
  display: flex;
  justify-content: center;
  height: 100vh;     
  background-color: #E0FFFF;
}
  * {
      padding: 0;
      font-family: sans-serif;
      margin: 0;     
      color: #4F4F4F;
  }  
  ;
  `;

export default Global;
