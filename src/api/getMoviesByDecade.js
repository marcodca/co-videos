import sendQuery from "./helpers/sendQuery";

export default ({ payload, page = 1, sortBy = "popularity.desc" }) =>
  sendQuery(
    `sort_by=${sortBy}&page=${pageNr}&primary_release_date.gte=${payload.min}-01-01&primary_release_date.lte=${payload.max}-12-31`
  );
