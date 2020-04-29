import React from "react";
import BrowseMovies from "../../ui/components/BrowseMovies";
import { cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithRedux } from "../App.test";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

test("Should show genres by default", () => {
  const history = createMemoryHistory();

  const { getByText, getByTestId } = renderWithRedux(
    <Router history={history}>
      <BrowseMovies />
    </Router>
  );

  const select = getByTestId("browse-select");

  expect(select.value).toBe("genres");
  expect(getByText("documentary")).toBeInTheDocument();
});
test("Should change the displayed categories when the select is changed", () => {
  const history = createMemoryHistory();

  const { getByText, getByTestId } = renderWithRedux(
    <Router history={history}>
      <BrowseMovies />
    </Router>
  );

  const select = getByTestId("browse-select");

  act(() => {
    fireEvent.change(select, { target: { value: "duration" } });
  });

  expect(getByText("very-short")).toBeInTheDocument();
});
