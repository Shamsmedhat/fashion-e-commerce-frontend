import { describe, expect, it } from "vitest";

import { getStarStates } from "./star-rating";

describe("getStarStates", () => {
  // Regression: the product page mapped over the array's elements instead of its indexes,
  // so every comparison was against `undefined` and no star was ever filled.
  it("fills one star per whole point", () => {
    expect(getStarStates(4)).toEqual(["full", "full", "full", "full", "empty"]);
    expect(getStarStates(5)).toEqual(["full", "full", "full", "full", "full"]);
  });

  it("marks the star a fraction falls in as partial", () => {
    expect(getStarStates(3.5)).toEqual(["full", "full", "full", "partial", "empty"]);
    expect(getStarStates(0.2)).toEqual(["partial", "empty", "empty", "empty", "empty"]);
  });

  it("shows no filled star for a product without ratings", () => {
    expect(getStarStates(undefined)).toEqual(["empty", "empty", "empty", "empty", "empty"]);
    expect(getStarStates(0)).toEqual(["empty", "empty", "empty", "empty", "empty"]);
  });

  it("clamps values outside the scale", () => {
    expect(getStarStates(9)).toEqual(["full", "full", "full", "full", "full"]);
    expect(getStarStates(-3)).toEqual(["empty", "empty", "empty", "empty", "empty"]);
  });
});
