import wantToWatchReducer, {
  addMovie,
  removeMovie,
  markMovieAsWatched,
  markMovieAsUnwatched,
  clearList,
} from "../../store/wantToWatchSlice";

const initialState = [
  { id: 1, tile: "The good the bad and the ugly", watched: false },
  { id: 2, tile: "Casablanca", watched: true },
  { id: 3, tile: "Citizen Kane", watched: false },
];

describe("wantToWatchSlice", () => {
  it("Should return the initial state when no valid action type is provided", () => {
    expect(wantToWatchReducer(initialState, { type: "NoSense" })).toBe(
      initialState
    );
  });
  it("Should add a movie properly, setting  watched property on in with a false value", () => {
    expect(
      wantToWatchReducer(initialState, addMovie({ title: "test" }))
    ).toMatchObject([...initialState, { title: "test", watched: false }]);
  });

  it("Should return the initial state if the movie id we want to add is already on it", () => {
    expect(
      wantToWatchReducer(
        initialState,
        addMovie({ id: 2, title: "Another movie" })
      )
    ).toBe(initialState);
  });

  it("Should delete a movie from collection when the removeMovie action is provided", () => {
    expect(wantToWatchReducer(initialState, removeMovie(2))).not.toContain({
      id: 2,
      tile: "Casablanca",
      watched: true,
    });
  });

  it("Should mark a movie as watched properly", () => {
    expect(
      wantToWatchReducer(initialState, markMovieAsWatched(1))
    ).toContainEqual({
      id: 1,
      tile: "The good the bad and the ugly",
      watched: true,
    });
  });
  it("Should mark a movie as unwatched properly", () => {
    expect(
      wantToWatchReducer(initialState, markMovieAsUnwatched(2))
    ).toContainEqual({
      id: 2,
      tile: "Casablanca",
      watched: false,
    });
  });

  it("Should empty the store when clearList is submitted", () => {
    expect(wantToWatchReducer(initialState, clearList())).toMatchObject([]);
  });
});
