import { createSlice } from "@reduxjs/toolkit";

const gePersistedData = () => {
  try {
    const data = localStorage.getItem("wantToWatchData");
    return data;
  } catch (e) {
    return undefined;
  }
};

const initialState = gePersistedData() ? JSON.parse(gePersistedData()) : [];

export const slice = createSlice({
  name: "wantToWatch",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      if (state.find((movie) => movie.id === action.payload.id)) return state;
      state.push({ ...action.payload, watched: false });
    },
    removeMovie: (state, action) =>
      state.filter((movie) => movie.id !== action.payload),
    markMovieAsWatched: (state, action) => {
      const target = state.find((movie) => movie.id === action.payload);
      target.watched = true;
    },
    markMovieAsUnwatched: (state, action) => {
      const target = state.find((movie) => movie.id === action.payload);
      target.watched = false;
    },
    clearList: () => [],
  },
});

export const selectWantToWatch = (state) => state;
export const {
  addMovie,
  removeMovie,
  markMovieAsWatched,
  markMovieAsUnwatched,
  clearList,
} = slice.actions;

export default slice.reducer;
