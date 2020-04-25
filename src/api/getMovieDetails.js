import sendQuery from "./helpers/sendQuery";

export default ({ payload }) => sendQuery(payload.id, "movie");
