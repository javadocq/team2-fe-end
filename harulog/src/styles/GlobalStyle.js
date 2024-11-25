import { createGlobalStyle } from "styled-components";
import UhBeeSeulvely from "../fonts/UhBeeSeulvely.woff";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'UhBee Seulvely';
    src: url(${UhBeeSeulvely}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'GangwonEdu_OTFBoldA';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;
