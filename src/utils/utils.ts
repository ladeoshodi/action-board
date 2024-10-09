import { AxiosError } from "axios";
import {
  IApiErrorResponse,
  IRegisterAPIErrorResponse,
} from "../interfaces/api";

function getAxiosErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as IApiErrorResponse;
    return data.detail || "An unknown error occurred";
  }
  return "An unknown error occurred";
}

function getAxiosErrorMessageOnRegistration(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as IRegisterAPIErrorResponse;
    return (
      data.email?.[0] ??
      data.username?.[0] ??
      data.first_name?.[0] ??
      data.last_name?.[0] ??
      data.password?.[0] ??
      "An unknown error occurred"
    );
  }
  return "An unknown error occurred";
}

export { getAxiosErrorMessage, getAxiosErrorMessageOnRegistration };
