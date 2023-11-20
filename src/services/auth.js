import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth/'
    }),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (user) => ({
                url: "login",
                body: user,
                method: "POST",
            })
        }),
        userRegister: builder.mutation({
            query: (newUser) => ({
                url: "",
                body: newUser,
                method: "POST",
            })
        }),
    }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = userApi