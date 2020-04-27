import sendQuery from "./helpers/sendQuery";

//Note: This endpoint is not behaving properly. Not much we can do about it.

export const getMoviesByDuration = ({ payload, page, sortBy = "popularity.desc" }) =>
  sendQuery(
    `sort_by=${sortBy}&page=${page}&with_runtime.gte=${payload.min}&with_runtime.lte=${payload.max}`,
    "discover"
  );
