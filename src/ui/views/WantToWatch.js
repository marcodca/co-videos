import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWantToWatch,
  removeMovie,
  markMovieAsWatched,
  markMovieAsUnwatched,
  clearList,
} from "../../store/wantToWatchSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WantToWatch = () => {
  const wantToWatchData = useSelector(selectWantToWatch);
  const dispatch = useDispatch();

  return (
    <Container>
      <h2>Want to watch list</h2>
      {!wantToWatchData.length ? (
        <p>
          You have no movies in your watch list, why don't you try
          <Link to="/"> browsing some movies?</Link>
        </p>
      ) : (
        wantToWatchData.map(({ id, title, watched, poster_path }) => (
          <Card
            key={id}
            style={{
              opacity: watched ? "0.6" : "1",
            }}
          >
            <div>
              <span>
              <h3>{title}</h3>
              <Link to={`/movie/${id}`}>View details</Link>
              </span>
              <span>
                <button
                  onClick={() => {
                    dispatch(
                      watched
                        ? markMovieAsUnwatched(id)
                        : markMovieAsWatched(id)
                    );
                  }}
                >
                  mark as {watched && "un"}watched{" "}
                </button>
                <button
                  onClick={() => {
                    dispatch(removeMovie(id));
                  }}
                >
                  Delete
                </button>
              </span>
            </div>
            <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
          </Card>
        ))
      )}

      {Boolean(wantToWatchData.length) && (
        <button
          onClick={() => {
            dispatch(clearList());
          }}
        >
          clear List
        </button>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2em 0;
  h2 {
    text-align: center;
  }
`;

const Card = styled.div`
  border: 5px solid grey;
  border-radius: 10px;
  background: rgb(0 0 0 / 0.07);
  margin: 0.3em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 3px 5px 2px rgb(0 0 0 / 0.1);
  h3 {
    margin: 0;
  }
  a {
    display: block;
  }
  div:first-child {
    margin-left: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  img {
    max-height: 150px;
    border-radius: 0 8px 8px 0;
  }
`;
