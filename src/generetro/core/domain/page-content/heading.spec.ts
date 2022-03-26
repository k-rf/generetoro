import { repeat } from "~/util/repeat";

import { Heading } from "./heading";

describe("Heading", () => {
  describe("constructor", () => {
    it.each(["a", repeat("x", 100)])("Accepted: %s", (a) => {
      expect(new Heading(a).valueOf()).toStrictEqual(a);
    });

    it.each(["", repeat("x", 101)])("Rejected: %s", (a) => {
      expect(() => new Heading(a)).toThrow();
    });
  });
});
