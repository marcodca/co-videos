import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import wantToWatchReducer from "../store/wantToWatchSlice";
import App from "../App.js";
import { act } from "react-dom/test-utils";
import { getMoviesByGenre } from "../api/getMoviesByGenre";

jest.mock("../api/getMoviesByGenre");

export function renderWithRedux(
  component,
  { initialState, store = createStore(wantToWatchReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

afterEach(cleanup);

test("It renders with redux", () => {
  const { getByTitle } = renderWithRedux(<App />);

  expect(getByTitle("CO-VIDEOS")).toBeInTheDocument();
});

test("Navigation works properly", async () => {
  getMoviesByGenre.mockImplementationOnce(() =>
    Promise.resolve({ page: 1, results: [] })
  );

  const { getByText } = renderWithRedux(<App />);

  //It should display the home view initially
  const homeH2 = getByText("Movies against the pandemic");
  expect(homeH2).toBeInTheDocument();

  act(() => {
    fireEvent.click(getByText("action"));
  });
  //And after clicking a link...
  //The new view should be displayed, in this case category/genre/action
  await waitFor(() => {
    getByText("action movies");
    expect(homeH2).not.toBeInTheDocument();
  });
});
