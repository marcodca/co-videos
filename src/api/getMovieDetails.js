import sendQuery from "./helpers/sendQuery";

export const getMovieDetails = ({ payload }) => sendQuery(payload.id, "movie");
