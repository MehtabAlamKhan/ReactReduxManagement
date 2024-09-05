import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userReturnType, userRegisterType } from "../../../Types/Types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/users" }),
  endpoints: (builder) => ({
    authenticateToken: builder.query<userReturnType, any>({
      query: (token) => {
        return {
          url: "/authenticateToken",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        };
      },
    }),
    login: builder.mutation<userReturnType, any>({
      query(user) {
        return {
          url: "/login",
          body: user,
          headers: { "Content-Type": "application/json" },
          method: "POST",
        };
      },
    }),
    register: builder.mutation<userReturnType, userRegisterType>({
      query: (body) => {
        return {
          url: "/register",
          body,
          headers: { "Content-Type": "application/json" },
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useAuthenticateTokenQuery,
  useLoginMutation,
  useRegisterMutation,
} = userApi;
