import sendQuery from "./helpers/sendQuery";

//Note: For some reason, when querying for runtime, the API will only accept one limit value, either "less than" or "more than", for this reason this endpoint functionality is limited, and querying for long movies, it's gonna return also all the medium, short and very-short movies as well. No much we can do about it.

export default ({ payload, sortBy = "popularity.desc", pageNr = 1 }) => {
  return sendQuery(
    `sort_by=${sortBy}&page=${pageNr}&with_runtime.lte=${payload.max}`
  );
};
