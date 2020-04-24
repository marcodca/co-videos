import { createGlobalStyle } from "styled-components";
import media from "./mediaUtil";

export default createGlobalStyle`
    html,
    body,
    #root {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    :root{
        --color-primary: #00bcd4;
        --color-secondary: #ff5722;
        --color-gray: 	#808080;
        --color-gray-light: #D3D3D3;
        --color-gray-dark: #2F4F4F;
    }
    body {
        ${media.md`font-size: 1.2em`};
        ${media.lg`font-size: 1.4em`};
        transition: font-size 0.3s;
        font-family: 'Merriweather', serif;
        color: var(--color-gray-dark);
        h1,h2,h3 {
        font-family: 'Archivo Narrow', sans-serif;
        color: black;
        }
    }
`;