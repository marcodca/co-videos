import sendQuery from "./helpers/sendQuery";

export default ({ payload, sortBy = "popularity.desc", pageNr = 1 }) =>
  sendQuery(`sort_by=${sortBy}&page=${pageNr}&with_genres=${payload.id}`);
