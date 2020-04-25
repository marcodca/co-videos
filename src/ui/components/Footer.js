import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

export const Footer = () => {
  return (
    <Container>
      <span>
        Powered by{" "}
        <a href="https://www.themoviedb.org/" title="The movie DB">
          TheMovieDB
        </a>
      </span>

      <span>
        Icons by {""}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </span>
      <span>
        By
        <a href="https://www.marcodecara.com/" title="Marco de Cara">
          <img width={30} src={logo} alt="marco de cara's logo" />
        </a>
      </span>
    </Container>
  );
};

const Container = styled.footer`
  background: var(--color-gray-light);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2.7em;
  font-size: 0.8em;
  text-align: center;
  span:last-child {
    display: flex;
    align-items: center;
    img {
      margin-left: 5px;
    }
  }
`;
