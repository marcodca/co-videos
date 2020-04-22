import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const H1 = styled.h1`
  color: red;
`;

const App = () => <H1>Testing it</H1>;

ReactDOM.render(<App />, document.querySelector("#root"));
