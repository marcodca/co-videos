import sendQuery from "./helpers/sendQuery";

export const getMoviesBySearch = ({ payload }) =>
  sendQuery(
    `page=1&query=${payload.query}&include_adult=false&include_adult=false`,
    "search"
  );
