import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  getMoviesByGenre,
  getMoviesByDecade,
  getMoviesByDuration,
} from "../../api";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import FetchMore from "../components/FetchMore";
import PropTypes from "prop-types";

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

export const MoviesCategory = ({ match, location }) => {
  const [moviesData, dispatch] = useReducer(reducer, initialState);

  const { category, name } = match.params;

  //Shared functionality between effects
  const fetchMovies = (actionType) => {
    if (moviesData.status === "loading") return;
    dispatch({ type: "set-loading" });
    let getMovies;
    //We check the category in the url to determine which fetching function we are using
    switch (category) {
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

    if (!location.state) {
      dispatch({ type: "set-error", payload: "Category not recognized" });
      return;
    }
    const { payload } = location.state;

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
    if (moviesData.response.page === 1) return;
    fetchMovies("set-same-sort-by-response");
  }, [moviesData.response.page]);

  useEffect(() => {
    fetchMovies("set-different-sort-by-response");
  }, [moviesData.sortBy]);

  const handleSelectSortByChange = (e) =>
    void dispatch({ type: "change-sort-by", payload: e.target.value });

  const SelectSortBy = () => (
    <SortByContainer>
      <label htmlFor="sort-by">Sort by:</label>
      <select
        onChange={handleSelectSortByChange}
        value={moviesData.sortBy}
        id="sort-by"
      >
        {selectSortByOptions.map(({ name, value }, i) => (
          <React.Fragment key={i}>
            <option value={`${value}.desc`}>🔽 {name} </option>
            <option value={`${value}.asc`}>🔼 {name} </option>
          </React.Fragment>
        ))}
      </select>
    </SortByContainer>
  );

  const {
    status,
    response: { error, results },
  } = moviesData;
  return (
    <Container>
      <h2>{name} movies</h2>
      <SelectSortBy />
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {results.map(({ id, title, poster_path, release_date }) => (
          <MovieCard
            key={id}
            id={id}
            title={title}
            picturePath={poster_path}
            releaseDate={release_date}
          />
        ))}
      </ul>
      {status === "loading" && <Spinner />}

      <FetchMore
        cb={() => {
          dispatch({ type: "increase-page" });
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  text-align: center;
  > h2 {
    margin-top: 4em;
    text-align: center;
    &::first-letter {
      text-transform: capitalize;
    }
  }

  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const SortByContainer = styled.div`
  text-align: center;
  > select {
    margin-left: 8px;
    height: 1.5em;
    option:nth-child(even) {
      background: coral;
    }
  }
`;

MoviesCategory.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
