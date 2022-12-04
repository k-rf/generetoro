import { Heading } from "./heading";
import { PageContent } from "./page-content";

describe("ページコンテンツを扱う PageContent クラス", () => {
  describe("コンテンツが空かどうかを判定する isEmpty メソッド", () => {
    it.each([
      [[], true],
      [[new Heading("XXX")], false],
    ])("%s => %s", (a, expected) => {
      expect(new PageContent(a).isEmpty()).toStrictEqual(expected);
    });
  });
});
