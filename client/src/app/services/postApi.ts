/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: (postData) => ({
        url: '/post/create-post',
        method: 'POST',
        body: postData
      })
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: '/post',
        method: 'GET'
      })
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/post/${id}`,
        method: 'GET'
      })
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/post/delete-post/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useCreatePostMutation, useGetAllPostsQuery, useGetPostByIdQuery, useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } = postApi

export const { endpoints: { createPost, getAllPosts, getPostById, deletePost } } = postApi
