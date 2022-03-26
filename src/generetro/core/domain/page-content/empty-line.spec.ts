import { EmptyLine } from "./empty-line";

describe("EmptyLine", () => {
  describe("constructor", () => {
    it("Accepted", () => {
      expect(new EmptyLine().valueOf()).toStrictEqual("");
    });
  });
});
