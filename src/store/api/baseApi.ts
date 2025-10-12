import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sarbeswardas-backend.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any)?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrap fetchBaseQuery to handle global toast messages
const baseQueryWithToast: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  // Only show toasts for POST, PUT, DELETE requests
  const method =
    typeof args === "object" && args.method ? args.method.toUpperCase() : "GET";

  if (result.data && ["POST", "PUT", "DELETE"].includes(method)) {
    const message = (result.data as any)?.message;
    if (message) {
      toast.success(message);
    }
  }

  // Handle errors
  if (result.error && ["POST", "PUT", "DELETE"].includes(method)) {
    const message =
      (result.error as any)?.data?.message || "Something went wrong!";
    toast.error(message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToast,
  endpoints: () => ({}),
  tagTypes: [],
});
