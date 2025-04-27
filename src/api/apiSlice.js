import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => 'tasks',
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: 'tasks',
                method: 'POST',
                body: newTask,
            }),
        }),
    }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = apiSlice;