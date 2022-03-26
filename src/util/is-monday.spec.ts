import { isMonday } from "./is-monday";

describe("isMonday", () => {
  it.each([
    [new Date(2022, 1, 21), true],
    [new Date(2022, 1, 22), false],
    [new Date(2022, 1, 23), false],
    [new Date(2022, 1, 24), false],
    [new Date(2022, 1, 25), false],
    [new Date(2022, 1, 26), false],
    [new Date(2022, 1, 27), false],
    [new Date(2022, 1, 28), true],
    [new Date(2022, 2, 1), false],
  ])("isMonday(%s) => %s", (a, expected) => {
    expect(isMonday(a)).toStrictEqual(expected);
  });
});
