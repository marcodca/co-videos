import React, { useEffect, useState, useReducer } from "react";
import getMoviesByGenre from "../../api/getMoviesByGenre";
import getMoviesByDecade from "../../api/getMoviesByDecade";
import getMoviesByDuration from "../../api/getMoviesByDuration";

const initialState = {
  status: "idle",
  sortBy: "popularity.desc",
  response: { error: null, results: [], page: 1 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set-loading":
      return {
        ...state,
        status: "loading",
      };

    case "set-idle":
      return {
        ...state,
        status: "idle",
      };
    case "set-error":
      return {
        ...state,
        status: "idle",
        response: { ...state.response, error: action.payload },
      };
    case "set-same-sort-by-response":
      return {
        ...state,
        status: "idle",
        response: {
          ...action.payload,
          results: [...state.response.results, ...action.payload.results],
        },
      };
    case "set-different-sort-by-response":
      return {
        ...state,
        status: "idle",
        response: {
          ...action.payload,
        },
      };
    case "change-sort-by":
      return {
        ...state,
        sortBy: action.payload,
        response: { ...state.response, page: state.response.page + 1 },
      };
    case "increase-page":
      return {
        ...state,
        response: { ...state.response, page: state.response.page + 1 },
      };
    default:
      return state;
  }
};

const selectSortByOptions = [
  { value: "popularity", name: "Popularity" },
  { value: "release_date", name: "Release date" },
  { value: "revenue", name: "Revenue" },
];

export const MoviesList = (props) => {
  const [moviesData, dispatch] = useReducer(reducer, initialState);

  //Shared functionality between effects
  const fetchMovies = (actionType) => {
    dispatch({ type: "set-loading" });
    let getMovies;
    switch (props.match.params.category) {
      case "genre": {
        getMovies = getMoviesByGenre;
        break;
      }
      case "decade": {
        getMovies = getMoviesByDecade;
        break;
      }
      case "duration": {
        getMovies = getMoviesByDuration;
        break;
      }
      default: {
        console.error("Category not recognized");
        return;
      }
    }

    if (!props.location.state) {
      dispatch({ type: "set-error", payload: "Category not recognized" });
      return;
    }
    const { payload } = props.location.state;

    getMovies({
      payload,
      page: moviesData.response.page,
      sortBy: moviesData.sortBy,
    }).then((response) => {
      if (response.error) {
        dispatch({ type: "set-error", payload: response.error });
        return;
      }
      dispatch({ type: actionType, payload: response });
    });
  };

  useEffect(() => {
    fetchMovies("set-same-sort-by-response");
  }, [moviesData.response.page]);

  useEffect(() => {
    fetchMovies("set-different-sort-by-response");
  }, [moviesData.sortBy]);

  console.log("props", props);
  console.log("state", moviesData);

  const handleSelectSortByChange = (e) =>
    void dispatch({ type: "change-sort-by", payload: e.target.value });

  const SelectSortBy = () => (
    <select onChange={handleSelectSortByChange} value={moviesData.sortBy}>
      {selectSortByOptions.map(({ name, value }, i) => (
        <React.Fragment key={i}>
          <option value={`${value}.desc`}>🔽 {name} </option>
          <option value={`${value}.asc`}>🔼 {name} </option>
        </React.Fragment>
      ))}
    </select>
  );

  const { status, response } = moviesData;
  return status === "loading" ? (
    <p>Loading...</p>
  ) : (
    <div>
      Movieees
      <SelectSortBy />
      {response.error && <p>Error: {response.error}</p>}
      Movies yes!
      {response.results.map((movie, i) => (
        <p key={i}>{movie.title}</p>
      ))}
      <button
        onClick={() => {
          dispatch({ type: "increase-page" });
        }}
      >
        More page
      </button>
    </div>
  );
};
