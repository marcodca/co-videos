import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWantToWatch } from "../../store/reducers/wantToWatchSlice";

export const Header = () => {
  const wantToWatchData = useSelector(selectWantToWatch);

  return (
    <Container>
      <Link to="/">
        <h2>CO-VIDEOS</h2>
      </Link>
      <Link to="/want-to-watch">
        Want to watch list: <br /> <span>{wantToWatchData.length}</span> movies
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
  > a {
    padding: 0.5em;
    text-align: center;
    &:last-child {
      padding: 0.2em;
      margin-right: 0.3em;  
      font-size: 0.8em;
      background: rgb(0 0 0 / 0.05);
      border-radius: 10px;
      > span {
        font-size: 1.5em;
        font-weight: bold;
      }
    }
  }
`;
