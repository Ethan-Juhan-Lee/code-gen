import { ActionFunction, redirect } from 'react-router-dom'
import { deleteContact } from './contacts'

export const action: ActionFunction = async ({ params }) => {
  const contactId = params.contactId as string
  await deleteContact(contactId)
  return redirect('/')
}
