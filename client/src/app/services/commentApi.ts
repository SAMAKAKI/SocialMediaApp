/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Comment } from './../types';
import { api } from "./api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (commentData) => ({
        url: '/comment/create-comment',
        method: 'POST',
        body: commentData
      })
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/comment/delete-comment/${commentId}`,
        method: 'DELETE'
      })
    }),
  })
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi

export const { endpoints: { createComment, deleteComment } } = commentApi
