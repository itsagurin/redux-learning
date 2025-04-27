import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => 'tasks',
            providesTags: ['Tasks']
        }),
        getTaskById: builder.query({
            query: (id) => `tasks/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tasks', id }]
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: 'tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }]
        }),
        toggleTaskComplete: builder.mutation({
            async queryFn(id, _api, _extraOptions, baseQuery) {
                try {
                    const taskResult = await baseQuery(`tasks/${id}`);
                    if (taskResult.error) return { error: taskResult.error };

                    const task = taskResult.data;
                    console.log("Current task state:", task);

                    const patchResult = await baseQuery({
                        url: `tasks/${id}`,
                        method: 'PATCH',
                        body: { completed: !task.completed }
                    });

                    console.log("Patch result:", patchResult);

                    return patchResult.data
                        ? { data: patchResult.data }
                        : { error: patchResult.error };
                } catch (err) {
                    console.error("Error in toggleTaskComplete:", err);
                    return { error: err };
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Tasks', id }]
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks']
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useToggleTaskCompleteMutation,
    useDeleteTaskMutation
} = apiSlice;