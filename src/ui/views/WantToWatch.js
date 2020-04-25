import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWantToWatch,
  removeMovie,
  markMovieAsWatched,
  markMovieAsUnwatched,
  clearList,
} from "../../store/reducers/wantToWatchSlice";

export const WantToWatch = () => {
  const wantToWatchData = useSelector(selectWantToWatch);
  const dispatch = useDispatch();

  return !wantToWatchData.length ? (
    <p>You have no movies in your watch list</p>
  ) : (
    <div>
      {wantToWatchData.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <button
            onClick={() => {
              dispatch(
                movie.watched
                  ? markMovieAsUnwatched(movie.id)
                  : markMovieAsWatched(movie.id)
              );
            }}
          >
            mark as {movie.watched && "un"}watched{" "}
          </button>
          <button
            onClick={() => {
              dispatch(removeMovie(movie.id));
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          dispatch(clearList());
        }}
      >
        clear List
      </button>
    </div>
  );
};
