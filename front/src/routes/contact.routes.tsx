import { createBrowserRouter, createRoutesFromElements, RouteObject } from 'react-router-dom'
import { Error } from '../Pages/error'
import {
  Contact,
  loader as contactLoader,
  action as contactAction,
} from '../Pages/contact/contact'
import { EditContact, action as editAction } from '../Pages/contact/edit'
import { Root, loader as rootLoader, action as rootAction } from '../Pages/contact/root'
import { action as destroyAction } from '../Pages/contact/destroy'
import { Index } from '../Pages/contact'

export const contactRoutes: RouteObject = {
  element: <Root />,
  errorElement: <Error />,
  loader: rootLoader,
  action: rootAction,
  children: [
    {
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: ':contactId',
          element: <Contact />,
          loader: contactLoader,
          action: contactAction,
        },
        {
          path: ':contactId/edit',
          element: <EditContact />,
          loader: contactLoader, // element usually have their own loader
          action: editAction,
        },
        {
          path: ':contactId/destroy',
          action: destroyAction,
          errorElement: <div>Oops! There was an error</div>,
        },
      ],
    },
  ],
}