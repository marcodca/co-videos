import React from "react";
import styled from "styled-components";
import getmovies from "./api/getMoviesByGenre";

const H1 = styled.h1`
  color: red;
`;

const App = () => {
  getmovies({ genre: 28 }).then((a) => console.log(a));
  return <H1>Testing it</H1>;
};

export default App;
