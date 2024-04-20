import React from 'react'
import { useGetAllPostsQuery } from '../../app/services/postApi'
import { CreatePost } from '../../components/createPost'

const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  )
}

export default Posts
