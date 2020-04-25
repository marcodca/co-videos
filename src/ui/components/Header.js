import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWantToWatch } from "../../store/reducers/wantToWatchSlice";
import eyeIcon from "../../assets/eye-open.svg";

export const Header = () => {
  const wantToWatchData = useSelector(selectWantToWatch);

  return (
    <Container>
      <Link to="/">
        <h2>
          CO-VID<span>EOS</span>
        </h2>
      </Link>
      <Link to="/want-to-watch">
        <img src={eyeIcon} width={35} />

        <span>{wantToWatchData.length} movies</span>
      </Link>
    </Container>
  );
};

const Container = styled.header`
  height: 3.5em;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 0 3px 5px 2px rgb(0 0 0 /0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 > span {
    color: var(--color-gray);
  }
  > a {
    padding: 0.5em;
    text-align: center;
    &:last-child {
      margin-right: 0.3em;
      font-size: 0.8em;
      background: rgb(0 0 0 / 0.05);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > span {
        font-weight: bold;
        color: #000;
      }
    }
  }
`;
