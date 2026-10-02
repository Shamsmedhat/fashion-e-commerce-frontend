import { describe, expect, it } from "vitest";

import { actionFailure, actionSuccess, runAction, unwrapActionResult } from "./action-result";
import { AppError } from "./app-errors";

describe("Server Action results", () => {
  it("returns the data of a successful action", () => {
    expect(unwrapActionResult(actionSuccess({ id: 1 }))).toEqual({ id: 1 });
  });

  // Regression: actions threw AppError, which production builds replace with a generic error.
  // The shopper saw Next.js's placeholder text and the "log in again" redirect never ran.
  it("carries the API's message and error type across the server boundary as plain data", () => {
    const failure = actionFailure(new AppError("Insufficient stock! Available: 1", 400));

    // Must survive JSON serialisation, which is what the server boundary does to it.
    const received = JSON.parse(JSON.stringify(failure));

    expect(() => unwrapActionResult(received)).toThrowError("Insufficient stock! Available: 1");
  });

  it("rebuilds an AppError the client can branch on", () => {
    const failure = actionFailure(new AppError("Unauthorized", 401, "authentication"));

    try {
      unwrapActionResult(JSON.parse(JSON.stringify(failure)));
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).isAuthentication).toBe(true);
      expect((error as AppError).statusCode).toBe(401);
    }
  });

  it("hides the details of unexpected errors", () => {
    const failure = actionFailure(new TypeError("fetch failed: ECONNREFUSED 10.0.0.5"));

    expect(failure.message).not.toContain("ECONNREFUSED");
    expect(failure.statusCode).toBe(500);
  });

  it("runAction never throws: it resolves to a success or a failure", async () => {
    await expect(runAction(async () => "done")).resolves.toEqual({ ok: true, data: "done" });
    await expect(
      runAction(async () => {
        throw new AppError("Bag not found!", 404);
      }),
    ).resolves.toMatchObject({ ok: false, message: "Bag not found!", statusCode: 404 });
  });
});
