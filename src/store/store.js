import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todosSlice';
import { apiSlice } from '../api/apiSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});