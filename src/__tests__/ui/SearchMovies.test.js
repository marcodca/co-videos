import React from "react";
import SearchMovies from "../../ui/components/SearchMovies";
import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithRedux } from "../App.test";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { getMoviesBySearch } from "../../api/getMoviesBySearch";

jest.mock("../../api/getMoviesBySearch");

afterEach(cleanup);

test("Should be able to search titles", async () => {
  getMoviesBySearch.mockImplementation(() =>
    Promise.resolve({
      page: 1,
      results: [
        {
          id: 1,
          title: "Casablanca",
          poster_path: "some/url",
          release_date: "01-01-2020",
        },
      ],
    })
  );
  const history = createMemoryHistory();

  const { getByText, getByTestId, debug } = renderWithRedux(
    <Router history={history}>
      <SearchMovies />
    </Router>
  );

  const searchInput = getByTestId("search-movie-input");

  act(() => {
    fireEvent.change(searchInput, { target: { value: "casablanca" } });
  });

  await waitFor(() => getByTestId("search-results-movie-ul"));

  expect(getMoviesBySearch).toHaveBeenCalledTimes(1);
  expect(getMoviesBySearch).toHaveBeenCalledWith({
    payload: { query: "casablanca" },
  });

  expect(getByText("Casablanca")).toBeInTheDocument();
});
