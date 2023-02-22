import { FC } from 'react'
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useFetcher,
  useLoaderData,
} from 'react-router-dom'
import { ContactT, getContact, updateContact } from './contacts'

export const loader: LoaderFunction = async ({ params }) => {
  const contact = await getContact(params.contactId as string)
  if (!contact) {
    const errorContact = new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw errorContact
  }
  return contact
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  return await updateContact(params.contactId as string, {
    favorite: formData.get('favorite') === 'true',
  })
}

export const Contact = () => {
  // const contact: ContactT = {
  //   first: 'Your',
  //   last: 'Name',
  //   avatar: 'https://placekitten.com/g/200/200',
  //   github: 'your_handel',
  //   notes: 'Some notes',
  //   favorite: true,
  // }
  const contact = useLoaderData() as ContactT

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first ?? contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.github && (
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`http://github.com/${contact.github}`}
            >
              {contact.github}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record')) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

const Favorite: FC<FavoriteProps> = ({ contact }) => {
  const fetcher = useFetcher()
  let favorite = contact.favorite
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}

interface FavoriteProps {
  contact: ContactT
}
