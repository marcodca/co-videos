import sendQuery from "../../api/helpers/sendQuery";
import axios from "axios";
jest.mock("axios");

beforeEach(jest.clearAllMocks);

describe("sendQuery", () => {
  it("Can handle different parameters correctly", async () => {
    axios.mockImplementation((url) => {
      return Promise.resolve({ status: 200 });
    });

    const sampleQueryOne = "JustARandomThing";
    const sampleQueryTwo = "AnotherDifferentStuff";

    await sendQuery(sampleQueryOne);
    await sendQuery(sampleQueryTwo);
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

    // console.log(response);
  });
});
