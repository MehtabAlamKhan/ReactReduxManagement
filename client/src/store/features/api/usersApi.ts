import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/users" }),
  endpoints: (builder) => ({
    authenticateToken: builder.query<any, void>({
      query: () => ({
        url: "/authenticateToken",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("jwt")}`,
        },
      }),
    }),
  }),
});

export const { useAuthenticateTokenQuery } = userApi;
