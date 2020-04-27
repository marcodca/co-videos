import sendQuery from "./helpers/sendQuery";

export const getMoviesByGenre = ({
  payload,
  page,
  sortBy = "popularity.desc",
}) =>
  sendQuery(
    `sort_by=${sortBy}&page=${page}&with_genres=${payload.id}`,
    "discover"
  );
