/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from 'react'

type Props = {
  error: string
}

export const ErrorMessage: React.FC<Props> = ({ error = '' }) => {
  return error && <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>
}
