import axios from "axios";

type ErrorResponse = {
  message?: string;
  errors?: string[];
};

export const handleMessageError = (error: unknown): string => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (error.response) {
      return (
        error.response.data?.message ||
        error.response.data?.errors?.join(", ") ||
        `Request failed with status ${error.response.status}`
      );
    }

    if (error.request) {
      return "No response from server";
    }

    return error.message || "Axios request error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};
