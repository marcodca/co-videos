import { getMoviesByGenre } from "../api";
import sendQuery from "../api/helpers/sendQuery";

jest.mock("../api/helpers/sendQuery");

beforeEach(jest.clearAllMocks);

//Giving the similarity between all the api functions, we are only testing this one for the time being.

describe("getMoviesByGenre", () => {
  it("sends correctly the params to sendQuery", () => {
    sendQuery.mockImplementation((a) => a);
    const resp = getMoviesByGenre({
      payload: { id: 1 },
      page: 5,
      sortBy: "something",
    });

    expect.assertions(3);
    expect(resp).toBe("sort_by=something&page=5&with_genres=1");
    expect(sendQuery).toHaveBeenCalledTimes(1);
    expect(sendQuery).toHaveBeenCalledWith(resp, "discover");
  });
  it("use the default parameter popularity.desc for sortBy", () => {
    sendQuery.mockImplementation((a) => a);
    const resp = getMoviesByGenre({
      payload: { id: 3 },
      page: 19,
    });

    expect.assertions(3);
    expect(resp).toBe("sort_by=popularity.desc&page=19&with_genres=3");
    expect(sendQuery).toHaveBeenCalledTimes(1);
    expect(sendQuery).toHaveBeenCalledWith(resp, "discover");
  });
}); 
