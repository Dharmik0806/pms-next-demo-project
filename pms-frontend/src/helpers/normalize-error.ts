// Turns any thrown value (Axios error, Error, string) into a readable message.
import axios from "axios";

export function normalizeError(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (axios.isAxiosError(error)) {
    // Backend sends { message } on errors
    if (error.response?.data?.message) return String(error.response.data.message);
    if (error.code === "ERR_NETWORK") return "Cannot reach the server. Check that the API is running.";
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
