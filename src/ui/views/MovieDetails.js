import React, { useState, useEffect } from "react";
import { getMovieDetails } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  removeMovie,
  selectWantToWatch,
} from "../../store/reducers/wantToWatchSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import eyeOpen from "../../assets/eye-open.svg";
import eyeClose from "../../assets/eye-close.svg";
import Spinner from "../components/Spinner";

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

  const {
    backdrop_path,
    tagline,
    overview,
    release_date,
    runtime,
    genres,
  } = response;

  return status === "loading" ? (
    <Spinner />
  ) : error ? (
    <p className="error">{error}</p>
  ) : (
    <Container>
      <Hero>
        {backdrop_path && (
          <img src={`https://image.tmdb.org/t/p/w780${backdrop_path}`} />
        )}
        <h2>{response.title}</h2>
      </Hero>
      <h3>{tagline}</h3>
      <p>{overview}</p>
      <ul>
        <li>
          <b>Release date:</b> {release_date}.
        </li>
        <li>
          <b>Runtime:</b> {runtime} minutes.
        </li>
        <li>
          <b>Genres:</b>{" "}
          {genres?.map(({ id, name }) => (
            <span key={id}>"{name}" </span>
          ))}
          .
        </li>
      </ul>
      <div>
        <button
          onClick={() => {
            dispatch(
              isMovieInWatchList(response.id)
                ? removeMovie(response.id)
                : addMovie(response)
            );
          }}
        >
          <img
            src={isMovieInWatchList(response.id) ? eyeClose : eyeOpen}
            width={25}
          />
          {isMovieInWatchList(response.id) ? "remove from" : "add to"} watch
          list
        </button>
        <Link to={"/want-to-watch"}>
          <button>go to want to watch list</button>
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  > ul {
    text-align: left;
    padding: 0;
    list-style: none;
  }
  > div:last-of-type {
    margin: 2em;
    display: flex;
    justify-content: center;
    button {
      height: 100%;
    }
    button:first-of-type {
      display: flex;
      align-items: center;
      img {
        margin: 0 5px;
      }
    }
  }
`;

const Hero = styled.div`
  position: relative;
  height: 100%;
  min-height: 100px;
  img {
    z-index: -1;
    border-radius: 20px;
    width: 100%;
  }
  h2 {
    font-size: 3em;
    margin: 0;
    top: 0;
    border-radius: 20px;
    text-align: center;
    display: flex;
    color: #fff;
    flex-direction: column-reverse;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;
