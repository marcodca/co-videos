import React, { useState } from "react";
import SearchMovies from "../components/SearchMovies";
import styled from "styled-components";
import BrowseMovies from "../components/BrowseMovies";
import noiseImg from "../../assets/noise.gif";

export const Home = () => {
  const [mode, setMode] = useState("browse");

  const handleModelButtonClick = (e) => void setMode(e.target.value);

  const ModeButtons = () => (
    <ModeButtonsContainer>
      {["browse", "search"].map((val, i) => (
        <button
          key={i}
          onClick={handleModelButtonClick}
          style={{
            background: mode !== val && "grey",
          }}
          value={val}
        >
          {val}
        </button>
      ))}
    </ModeButtonsContainer>
  );

  return (
    <Container>
      <h1>
        CO-VID<span>EOS</span>
      </h1>
      <h2>Movies against the pandemic</h2>
      <sub>
        Are the lockdown days starting to feel like too much to handle? Can't
        you find a good way to spend the quarantine?  Worry no more,{" "}
        <b>CO-VIDEOS </b>
        offers you a wide cinematographic archive so you can finally keep track
        of all those movies you always wanted to watch, but never had the time.
      </sub>
      <ModeButtons />
      {mode === "browse" ? <BrowseMovies /> : <SearchMovies />}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  > h1 {
    font-size: 2.8em;
    margin-bottom: 0;
    background: url(${noiseImg});
    background-size: contain;
    background-attachment: fixed;
    color: #fff;
    display: inline-block;
    padding: 0.6em;
    border-radius: 25px;
    box-shadow: 0 0 8px 5px rgb(0 0 0 / 0.2);
    > span {
      color: var(--color-gray-light);
    }
  }
  > h2 {
    margin-top: 0;
  }
`;

const ModeButtonsContainer = styled.div`
  margin: 1em 0;
  button:active {
    background: #fff;
  }
`;
