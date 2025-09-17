export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}
export function errorMessage(
  error: unknown,
  fallBack = "An unexpected error occurred. Please try again."
) {
  if (typeof error === "string") return error;
  if (isErrorWithMessage(error)) return error.message;
  try {
    return String(error);
  } catch {
    return fallBack;
  }
}
