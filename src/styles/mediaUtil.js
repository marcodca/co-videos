import { css } from "styled-components";

//A media queries spitter, mobile first and elegant.

const screens = {
  sm: "320px",
  md: "768px",
  lg: "1240px",
};

export default Object.keys(screens).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${screens[label].replace("px", "") / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
