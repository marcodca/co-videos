import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import wantToWatchReducer from "../store/reducers/wantToWatchSlice";
import App from "../App.js";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

export function renderWithRedux(
  component,
  { initialState, store = createStore(wantToWatchReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

// const history = createMemoryHistory();
//   <Router history={history}>
//     <App />
//   </Router>

afterEach(cleanup);

test("It renders with redux", () => {
  const { getByTitle } = renderWithRedux(<App />);

  expect(getByTitle("CO-VIDEOS")).toBeInTheDocument();
});
