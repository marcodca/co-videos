import React, { useState, useEffect } from "react";
import getMovieDetails from "../../api/getMovieDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  removeMovie,
  selectWantToWatch,
} from "../../store/reducers/wantToWatchSlice";

export const MovieDetails = ({ match }) => {
  const [movieData, setMovieData] = useState({
    status: "idle",
    error: null,
    response: {},
  });

  const id = match.params;

  useEffect(() => {
    setMovieData((prev) => ({ ...prev, status: "loading" }));

    getMovieDetails({ payload: id }).then((response) => {
      if (response.error) {
        setMovieData((prev) => ({
          ...prev,
          status: "idle",
          error: response.error,
        }));
        return;
      }
      setMovieData(() => ({
        status: "idle",
        error: null,
        response,
      }));
    });
  }, []);

  const { status, error, response } = movieData;
  const dispatch = useDispatch();
  const wantToWatchData = useSelector(selectWantToWatch);

  const isMovieInWatchList = (id) =>
    wantToWatchData.find((movie) => movie.id === id);

  console.log(response);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <div>
      <h2>{response.title}</h2>
      <h3>{response.tagline}</h3>
      <button
        onClick={() => {
          dispatch(
            isMovieInWatchList(response.id)
              ? removeMovie(response.id)
              : addMovie(response)
          );
        }}
      >
        {" "}
        {isMovieInWatchList(response.id) ? "remove from" : "add to"} watch list
      </button>
    </div>
  );
};
