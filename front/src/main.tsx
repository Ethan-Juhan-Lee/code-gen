import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Error } from './Pages/error'
import {
  Contact,
  loader as contactLoader,
  action as contactAction,
} from './Pages/contact/contact'
import { EditContact, action as editAction } from './Pages/contact/edit'
import { Root, loader as rootLoader, action as rootAction } from './Pages/contact/root'
import { action as destroyAction } from './Pages/contact/destroy'
import { Index } from './Pages/contact'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
