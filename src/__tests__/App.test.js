import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import reducer from "../store/reducers/wantToWatchSlice";
import App from "../App";

export function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

// afterEach(cleanup);

test("It renders with redux", () => {
  const { getByTitle } = renderWithRedux(<App />);

  expect(getByTitle("CO-VIDEOS")).toBeInTheDocument();
});
