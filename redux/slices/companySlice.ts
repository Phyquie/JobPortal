import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const companyApi = createApi({
    reducerPath: "companyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/user/company" }),
    tagTypes: ["Company"],
    endpoints: (builder) => ({
        createCompany: builder.mutation({
            query: (newCompany) => ({
                url: "/",
                method: "POST",
                body: newCompany,
            }),
            invalidatesTags: ["Company"],
        }),
        updateCompany: builder.mutation({
            query: ({ id, updatedCompany }: { id: string; updatedCompany: any }) => ({
                url: `/${id}`,
                method: "PUT",
                body: updatedCompany,
            }),
            invalidatesTags: ["Company"],
        }),
        deleteCompany: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Company"],
        }),
        getCompany: builder.query({
            query: () => "/",
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Company"],

        }),
        getCompanyById: builder.query({
            query: (id) => `/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Company"],
        }),
    }),
});

export const {
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
    useGetCompanyQuery,
    useGetCompanyByIdQuery,
} = companyApi;

