import { FC } from 'react'
import { useRouteError } from 'react-router-dom'

export const Error: FC = () => {
  const error = useRouteError() as UseRouterErrorReturnType
  console.error(error)

  return (
    <div id="error-page">
      <h1>Ooops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

interface UseRouterErrorReturnType {
  statusText: string
  message: string
}
