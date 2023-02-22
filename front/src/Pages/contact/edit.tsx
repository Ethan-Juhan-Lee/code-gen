import {
  ActionFunction,
  Form,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { ContactT, updateContact } from './contacts'

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const contactId = params.contactId as string
  const updates = Object.fromEntries(formData) as Partial<ContactT>
  await updateContact(contactId, updates)
  return redirect(`/contacts/${contactId}`)
}

export const EditContact = () => {
  const contact = useLoaderData() as ContactT
  const navigate = useNavigate()

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Gihub</span>
        <input
          type="text"
          name="github"
          placeholder="github id"
          defaultValue={contact.github}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={navigate.bind(null, -1)}>
          Cancel
        </button>
      </p>
    </Form>
  )
}
