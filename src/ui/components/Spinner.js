import React from "react";
import styled, { keyframes } from "styled-components";
import virus from "../../assets/virus.svg";

const Spinner = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Img width={50} src={virus} alt="spinner" />
    </div>
  );
};

const rotate = keyframes`
 { 100% {  transform:rotate(360deg); } }
`;

const Img = styled.img`
  padding: 1em;
  margin: 0 auto;
  animation: 2s ${rotate} ease-out infinite;
`;

export default Spinner;
