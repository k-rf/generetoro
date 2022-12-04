import { RetroType, TRetroType } from "./retro-type";

describe("ふりかえりの種別を扱う RetroType クラス", () => {
  describe("種別が「日次」であるかどうかを判定する isDaily メソッド", () => {
    it.each<[TRetroType, boolean]>([
      ["Daily", true],
      ["Weekly", false],
    ])("%s => %s", (a, expected) => {
      expect(new RetroType(a).isDaily()).toStrictEqual(expected);
    });
  });
});
