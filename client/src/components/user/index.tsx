/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from 'react'
import { User as UserNext } from '@nextui-org/react'
import { BASE_URL } from '../../constants'
 
type Props = {
  name: string,
  avatarUrl: string,
  description?: string,
  className?: string
}

export const User: React.FC<Props> = ({name = '', avatarUrl = '', description = '', className = ''}) => {
  return (
    <UserNext name={name} className={className} description={description} avatarProps={{src: `${BASE_URL}${avatarUrl}`}}/>
  )
}
