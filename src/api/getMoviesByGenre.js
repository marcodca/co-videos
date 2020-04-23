import sendQuery from "./helpers/sendQuery";

export default ({ payload, page, sortBy = "popularity.desc" }) =>
  sendQuery(`sort_by=${sortBy}&page=${page}&with_genres=${payload.id}`);
