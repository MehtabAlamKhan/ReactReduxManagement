import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type errorReturnType = {
  msg: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/users" }),
  endpoints: (builder) => ({
    authenticateToken: builder.query<any, void>({
      query: () => ({
        url: "/authenticateToken",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("jwt")}`,
        },
      }),
    }),
    login: builder.mutation<any | errorReturnType, any>({
      query(user) {
        return {
          url: "/login",
          body: user,
          headers: { "Content-Type": "application/json" },
          method: "POST",
        };
      },
    }),
  }),
});

export const { useAuthenticateTokenQuery, useLoginMutation } = userApi;
