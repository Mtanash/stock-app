import { User as UserInterface } from "./../../interfaces/index";
import { apiSlice } from "./apiSlice";

type User = {
  name: string;
  password: string;
};

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation<
      { user: UserInterface; accessToken: string },
      User
    >({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      transformResponse: (rawResult: {
        data: { user: UserInterface; accessToken: string };
        message: string;
      }) => {
        return {
          user: rawResult.data.user,
          accessToken: rawResult.data.accessToken,
        };
      },
    }),
    loginUser: builder.mutation<
      { user: UserInterface; accessToken: string },
      User
    >({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
      transformResponse: (rawResult: {
        data: { user: UserInterface; accessToken: string };
        message: string;
      }) => {
        return {
          user: rawResult.data.user,
          accessToken: rawResult.data.accessToken,
        };
      },
    }),
  }),
});

export const { useCreateNewUserMutation, useLoginUserMutation } = extendedApi;
