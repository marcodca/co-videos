import React, { useState, useEffect, useRef } from "react";
import { getMoviesBySearch } from "../../api";
import styled from "styled-components";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const initialState = {
  status: "idle",
  response: {
    error: null,
    results: [],
  },
};

const SearchMovies = () => {
  const [inputValue, setInputValue] = useState("");
  const [moviesData, setMoviesData] = useState(initialState);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value || "");
  };

  useEffect(() => {
    if (!inputValue.length) {
      setMoviesData(initialState);
      return;
    }
    

    //debounce
    const id = setTimeout(() => {
      setMoviesData((prev) => ({ ...prev, status: "loading" }));
      getMoviesBySearch({
        payload: { query: inputValue },
      }).then((response) => {
        setMoviesData((prev) => ({ ...prev, status: "idle", response }));
      });
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [inputValue]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    error,
    status,
    response: { results },
  } = moviesData;

  return (
    <Container>
      Search movies:
      <div>
        <input
          data-testid="search-movie-input"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter title"
        />
        {Boolean(inputValue.length) && (
          <span
            title="Delete"
            onClick={() => {
              setInputValue("");
              inputRef.current.focus();
            }}
          >
            ✖
          </span>
        )}
      </div>
      {error && <p className="error">Error: {error}</p>}
      {status === "loading" ? (
        <Spinner />
      ) : !results.length ? (
        inputValue.length > 2 && <p>No results</p>
      ) : (
        <ul data-testid="search-results-movie-ul">
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
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 80vh;
  > div {
    position: relative;
    width: fit-content;
    margin: 0.2em auto;
    span {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      color: red;
      cursor: pointer;
    }
  }
  > div > input {
    font-size: 1em;
    display: inline-block;
    height: 1.2em;
    border: 2px solid #000;
    border-radius: 5px;
    box-shadow: inset 1px 1px 3px 2px rgb(0 0 0 / 0.2);
    &::placeholder {
      text-align: center;
    }
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export default SearchMovies;
