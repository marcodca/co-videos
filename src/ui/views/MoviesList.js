import React, { useEffect, useState } from "react";
import getMoviesByGenre from "../../api/getMoviesByGenre";
import getMoviesByDecade from "../../api/getMoviesByDecade";
import getMoviesByDuration from "../../api/getMoviesByDuration";

export const MoviesList = (props) => {
  const [data, setData] = useState({
    status: "idle",
    response: { error: null, results: [], page: 1 },
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, status: "loading" }));

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
        setData(() => ({
          status: "idle",
          response: { error: "Category not recognized" },
        }));
        return;
      }
    }

    const { payload } = props.location.state;

    getMovies({ payload, page: data.response.page }).then((response) => {
      console.log("response", response);
      if (response.error) {
        setData((prev) => ({
          status: "idle",
          response: { ...prev.response, error: response.error },
        }));
        return;
      }

      setData((prev) => ({
        status: "idle",
        response: {
          ...response,
          results: [...prev.response.results, ...response.results],
        },
      }));
    });
  }, [data.response.page]);

  console.log("props", props);
  console.log("data", data);

  const { status, response } = data;

  console.log("error", response.error);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : (
    <div>
      Movieees
      {response.error && <p>Error: {response.error}</p>}
      Movies yes!
      {response.results.map((movie, i) => (
        <p key={i}>{movie.title}</p>
      ))}
      <button
        onClick={() => {
          setData((prev) => ({
            ...prev,
            response: { ...prev.response, page: prev.response.page + 1 },
          }));
        }}
      >
        More page
      </button>
    </div>
  );
};
