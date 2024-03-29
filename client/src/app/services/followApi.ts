/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Like } from './../types';
import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<Like, { followingId: string }>({
      query: (body) => ({
        url: '/follow/follow-user',
        method: 'POST',
        body
      })
    }),
    unfollowUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/follow/unfollow-user/${userId}`,
        method: 'DELETE'
      })
    }),
  })
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi

export const { endpoints: { followUser, unfollowUser } } = followApi
