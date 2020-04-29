import React from "react";
import { Home } from "../../ui/views";
import { cleanup, fireEvent } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { renderWithRedux } from "../App.test";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

test("Should show browse movies initially", () => {
  const history = createMemoryHistory();

  const { getByText } = renderWithRedux(
    <Router history={history}>
      <Home />
    </Router>
  );

  expect(getByText("Browse movies by:")).toBeInTheDocument();
});
test("Should show search movies when the corresponding button in clicked", () => {
  const history = createMemoryHistory();

  const { getByText } = renderWithRedux(
    <Router history={history}>
      <Home />
    </Router>
  );

  act(() => {
    fireEvent.click(getByText("search"));
  });

  expect(getByText("Search movies:")).toBeInTheDocument();
});
