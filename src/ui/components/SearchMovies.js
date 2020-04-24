import React, { useState, useEffect } from "react";
import getMoviesBySearch from "../../api/getMoviesBySearch";

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  const {
    error,
    status,
    response: { results },
  } = moviesData;

  return (
    <div>
      Search movies:
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {error && <p>Error: {error}</p>}
      {status === "loading" ? (
        <p>Loading...</p>
      ) : !results.length ? (
        <p>No results</p>
      ) : (
        results.map((movie) => <p key={movie.id}>{movie.title}</p>)
      )}
    </div>
  );
};

export default SearchMovies;
