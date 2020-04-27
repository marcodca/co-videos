import React from "react";
import styled from "styled-components";
import virus from "../../assets/virus.svg";

export const NotFound = () => (
  <Text>
    <span>
      4<img src={virus} />4
    </span>
    The page does not exist
  </Text>
);

const Text = styled.h2`
  font-size: 2em;
  text-align: center;
  span {
      font-size: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  img {
    width: 1em;
  }
`;
