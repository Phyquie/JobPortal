import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const clerkApi = createApi({
    reducerPath: "clerkApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/webhook" }),
    tagTypes: ["Clerk"],
    endpoints: (builder) => ({
        createClerk: builder.mutation({
            query: (newClerk) => ({
                url: "/user",
                method: "POST",
                body: newClerk,
            }),
            invalidatesTags: ["Clerk"],
        }),
    }),
});

export const {
    useCreateClerkMutation,
} = clerkApi;

