/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from 'react'

type Props = {
  children: string,
  size?: string,
}

export const Typography: React.FC<Props> = ({ children, size = 'text-xl' }) => {
  return (
    <div>Typography</div>
  )
}
