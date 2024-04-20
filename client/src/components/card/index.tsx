/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useState } from 'react'
import { CardBody, CardHeader, Card as CardNext, Spinner } from '@nextui-org/react'
import { useLikePostMutation, useUnlikePostMutation } from '../../app/services/likeApi'
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi'
import { useDeleteCommentMutation } from '../../app/services/commentApi'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { User } from '../user'
import { formatToClientDate } from '../../utils/formatToClientDate'
import { RiDeleteBinLine } from 'react-icons/ri'

type Props = {
  avatarUrl: string,
  name: string,
  authorId: string,
  content: string,
  commentId?: string,
  likesCount?: number,
  commentsCount?: number,
  createdAt?: Date,
  id?: string,
  cardFor: 'comment' | 'post' | 'current-post',
  likeByUser?: boolean 
}

export const Card: React.FC<Props> = ({ avatarUrl = '', name = '', authorId = '', content = '', commentId = '', likesCount = 0, commentsCount = 0, createdAt, id = '', cardFor = 'post', likeByUser = false }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);
   
  return (
    <CardNext>
      <CardHeader className='justify-between items-center bg-transparent'>
        <Link to={`/user/${authorId}`}>
          <User name={name} className='text-small font-semibold leading-none text-default-600' avatarUrl={avatarUrl} description={createdAt && formatToClientDate(createdAt)}/>
        </Link>
        { authorId === currentUser?.id && (
          <div className="cursor-pointer">
            { deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            ) }
          </div>
        ) }
      </CardHeader>
      <CardBody className='px-3 py-2 mb-5'>

      </CardBody>
    </CardNext>
  )
}
