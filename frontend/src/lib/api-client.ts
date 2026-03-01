import type { ApiError } from "@/types";

const BASE_URL = "/api";

class ApiClientError extends Error {
  public code: string;
  public status: number;

  constructor({ message, code, status }: ApiError) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let error: ApiError;
    try {
      error = await response.json();
    } catch {
      error = {
        message: `Request failed with status ${response.status}`,
        code: "UNKNOWN_ERROR",
        status: response.status,
      };
    }
    throw new ApiClientError(error);
  }

  return response.json();
}

export const apiClient = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<T>(response);
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  async upload<T>(path: string, formData: FormData): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      body: formData,
    });
    return handleResponse<T>(response);
  },
};

export { ApiClientError };
