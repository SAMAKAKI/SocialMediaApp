/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Like } from './../types';
import { api } from "./api";

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: (body) => ({
        url: '/like/like-post',
        method: 'POST',
        body
      })
    }),
    unlikePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/like/unlike-post/${postId}`,
        method: 'DELETE'
      })
    }),
  })
})

export const { useLikePostMutation, useUnlikePostMutation } = likeApi

export const { endpoints: { likePost, unlikePost } } = likeApi
