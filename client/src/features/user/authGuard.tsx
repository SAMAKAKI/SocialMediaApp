import type React from 'react'
import { useCurrentQuery } from '../../app/services/userApi'
import { Spinner } from '@nextui-org/react'

type Props = {
  children: JSX.Element
}

export const AuthGuard: React.FC<Props> = ({ children }) => {
  const { isLoading } = useCurrentQuery()

  if(isLoading)
    return (<div className='flex justify-center items-center w-full h-full'><Spinner size='lg' className='self-center'/></div>)

  return (
    children
  )
}

