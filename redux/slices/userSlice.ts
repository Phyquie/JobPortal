import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface User {
    id: string
    firstName: string
    lastName: string
    clerkId: string
    email: string
    savedResumeUrl?: string
    Job: Job[]
}


interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    pin: string;
    type: string;
    salary?: number;
    skills?: string;
    category: string;
    description: string;
    jobDocUrl?: string;
    createdAt: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/user' }),
    tagTypes: ['User', 'Application'],
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (id) => `/${id}`,
            transformResponse: (response: { data: User }) => response.data,
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<User, Partial<User> & { id: string }>({
            query: ({ id, ...updatedUser }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: ['User'],
        }),
        getApplicationsByUserId: builder.query({
            query: () => `/application`,
            transformResponse: (response: { data: any[] }) => response.data,
            providesTags: ['Application'],
        }),
        postApplication: builder.mutation({
            query: (formData) => ({
                url: `/application`,
                method: 'POST',
                body: { ...formData },
            }),
            // getHostedJobs: builder.query<Job[], string>({
            //     query: (userId) => `/hosted-jobs/${userId}`,
            // }),

        })
    })
});


export const {
    useGetUserByIdQuery,
    useGetApplicationsByUserIdQuery,
    usePostApplicationMutation,
    // useGetHostedJobsQuery,
} = userApi;


