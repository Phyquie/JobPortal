import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get } from 'http';




interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    pin: string;
    type: string;
    salary?: string;
    skills?: string;
    category: string;
    description: string;
    jobDocUrl?: string;
    createdAt: string;
}

export const featureApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/job' }),
    tagTypes: ['Job'],
    endpoints: (builder) => ({
        getJobById: builder.query<Job, string>({
            query: (id) => `/${id}`,
            transformResponse: (response: { data: Job }) => response.data,
            providesTags: ['Job'],

        }),
        getAllJobs: builder.query<Job[], Record<string, string | undefined>>({
            query: (params = {}) => {
                const searchParams = new URLSearchParams();

                for (const [key, value] of Object.entries(params)) {
                    if (value !== undefined && value !== '') {
                        searchParams.append(key, value);
                    }
                }

                return {
                    url: `/?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: { data: Job[] }) => response.data,
            providesTags: ['Job'],
        }),

        createJob: builder.mutation<Job, Partial<Job>>({
            query: (newJob) => ({
                url: '/',
                method: 'POST',
                body: newJob,
            }),
            invalidatesTags: ['Job'],
        }),

        deleteJobById: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Job'],
        }),
        getJobApplicants: builder.query<any, string>({
            query: (id) => `/applicants/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ['Job'],
        }),
        updateApplicantsStatus: builder.mutation({
            query: (data) => ({
                url: '/applicants',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Job'],
        })
    }),
});


export const {
    useGetJobByIdQuery,
    useGetAllJobsQuery,
    useCreateJobMutation,
    useDeleteJobByIdMutation,
    useGetJobApplicantsQuery,
    useUpdateApplicantsStatusMutation
} = featureApi;
