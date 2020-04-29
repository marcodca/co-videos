import { configureStore } from "@reduxjs/toolkit";
import reducer from "./wantToWatchSlice";

const store = configureStore({
  reducer,
});

//Persisting data in local storage
store.subscribe(
  () =>
    void localStorage.setItem(
      "wantToWatchData",
      JSON.stringify(store.getState())
    )
);

export default store;
