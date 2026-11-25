import axios, { isAxiosError } from "axios";

export const http = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10_000,
});

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.code === "ECONNABORTED") return "The request timed out.";
    if (!error.response) return "Network error. Check your connection.";
    return `Request failed (${error.response.status}).`;
  }
  return "Something went wrong.";
}