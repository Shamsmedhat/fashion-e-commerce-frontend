import { AppError, type AppErrorType } from "./app-errors";

// What a Server Action sends back to the browser.
//
// Next.js replaces the message of any error *thrown* by a Server Action with a generic one in
// production, and the error loses its class on the way. Actions therefore return failures as
// plain data, and the client turns them back into an AppError with `unwrapActionResult`.
export type ActionSuccess<T> = { ok: true; data: T };

export type ActionFailure = {
  ok: false;
  message: string;
  statusCode: number;
  type: AppErrorType;
};

export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

export function actionSuccess<T>(data: T): ActionSuccess<T> {
  return { ok: true, data };
}

export function actionFailure(error: unknown): ActionFailure {
  if (error instanceof AppError) {
    return { ok: false, message: error.message, statusCode: error.statusCode, type: error.type };
  }

  // Unexpected errors (network down, bug) never expose their details to the browser.
  return {
    ok: false,
    message: "Something went wrong. Please try again.",
    statusCode: 500,
    type: "general",
  };
}

// Server side: runs the request behind an action and turns a thrown error into a failure result.
export async function runAction<T>(request: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    return actionSuccess(await request());
  } catch (error) {
    return actionFailure(error);
  }
}

// Client side: returns the data or throws the failure as a real AppError.
export function unwrapActionResult<T>(result: ActionResult<T>): T {
  if (result.ok) return result.data;

  throw new AppError(result.message, result.statusCode, result.type);
}
