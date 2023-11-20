import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  } from 'react-cookie';

const headers = {
    "auth-token" : localStorage.getItem("token")
};

// Define a service using a base URL and expected endpoints
export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/note/'
    }),
    tagTypes: ["note"],
    endpoints: (builder) => ({
        getallNotes: builder.query({
            query: () => ({
                url: "fetchallnotes",
                headers: headers,
                method: "GET"
            }),
            providesTags: ['note'],
        }),
        onerror: (error, { dispatch }) => {
            if (error.status === 401) {
                // Unauthorized error, clear relevant cache entries
                dispatch(noteApi.util.invalidateTags(['note']));
            }
        },
        deleteNoteById: builder.mutation({
            query: (noteId) => ({
                url: `/deletenote/${noteId}`,
                headers: headers,
                method: "DELETE"
            }),
            invalidatesTags: ['note'],
        }),
        createNote: builder.mutation({
            query: (newNote) => ({
                url: "addnote",
                body: newNote,
                headers: headers,
                method: "POST",
            }),
            invalidatesTags: ['note'],
        }),
        updateNote: builder.mutation({
            query: (note) => ({
                url: `updatenote/${note._id}`,
                body: note,
                headers: headers,
                method: "PUT",
            }),
            invalidatesTags: ['note'],
        }),
    }),
});

export const { useCreateNoteMutation, useUpdateNoteMutation, useGetallNotesQuery, useDeleteNoteByIdMutation } = noteApi