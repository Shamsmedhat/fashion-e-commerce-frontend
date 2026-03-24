import { AppError } from "./app-errors";

export default async function catchError<T>(
  promise: Promise<APIResponse<T>>
): Promise<[T & { message: "success" }, null] | [null, AppError]> {
  try {
    const data = await promise;

    if ("status" in data && (data.status === "fail" || data.status === "error")) {
      const statusCode = data.status === "fail" ? 400 : 500;
      throw new AppError(data.message, statusCode);
    }

    return [data as T & { message: "success" }, null];
  } catch (err) {
    if (err instanceof AppError) {
      return [null, err];
    }

    const message = err instanceof Error ? err.message : "An unexpected error occurred";
    return [null, new AppError(message, 500)];
  }
}
