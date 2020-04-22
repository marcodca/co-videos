import { createGlobalStyle } from 'styled-components';

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
`