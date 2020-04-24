import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/wantToWatchSlice";
export default configureStore({
  reducer,
});
