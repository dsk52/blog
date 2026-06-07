import { yyyyMMddFormatter } from "./Date";

describe("yyyyMMddFormatter", () => {
  it("日付をJSTのyyyy/MM/dd形式に変換すること", () => {
    expect(yyyyMMddFormatter.format(new Date("2026-06-05T15:00:00.000Z"))).toBe("2026/06/06");
  });

  it("月日が1桁の場合にゼロ埋めすること", () => {
    expect(yyyyMMddFormatter.format(new Date("2026-01-09T00:00:00.000Z"))).toBe("2026/01/09");
  });
});
