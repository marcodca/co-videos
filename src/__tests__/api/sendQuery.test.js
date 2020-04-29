import sendQuery from "../../api/helpers/sendQuery";
import axios from "axios";

//mocks
jest.mock("axios");

beforeEach(jest.clearAllMocks);

describe("sendQuery", () => {
  it("Can handle different parameters correctly", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({ status: 200 });
    });

    const sampleQueryOne = "JustARandomThing";
    const sampleQueryTwo = "AnotherDifferentStuff";

    await sendQuery(sampleQueryOne);
    await sendQuery(sampleQueryTwo);
    expect.assertions(5);
    expect(axios).toHaveBeenCalledTimes(2);

    expect(axios).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        url: expect.stringMatching(sampleQueryOne),
      })
    );

    expect(axios).not.toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        url: expect.stringMatching(sampleQueryTwo),
      })
    );
    expect(axios).toHaveBeenLastCalledWith(
      expect.objectContaining({
        url: expect.stringMatching(sampleQueryTwo),
      })
    );
    expect(axios).not.toHaveBeenLastCalledWith(
      expect.objectContaining({
        url: expect.stringMatching(sampleQueryOne),
      })
    );
  });

  it("Handles api error correctly", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({ status: 401, statusText: "Some error" });
    });

    const response = await sendQuery("query");

    expect.assertions(2);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(response).toMatchObject({ error: "Some error" });
  });
  it("Handles other errors correctly", async () => {
    axios.mockImplementation(() => {
      throw new Error("network error");
    });
    const response = await sendQuery("query");
    expect.assertions(2);

    expect(axios).toHaveBeenCalledTimes(1);
    expect(response).toMatchObject({ error: "network error" });
  });
});
