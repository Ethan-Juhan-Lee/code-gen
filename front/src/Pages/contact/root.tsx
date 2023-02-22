import { FC, useCallback } from 'react'
import {
  Form,
  NavLink,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom'
import { ContactT, createContact, getContacts } from './contacts'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  return { q, contacts }
}

export const action = async () => {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export const Root: FC = () => {
  const { q, contacts } = useLoaderData() as {
    q: string | null
    contacts: ContactT[]
  }
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
    navigation.location != null &&
    new URLSearchParams(navigation.location.search).has('q')

  const callbackRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (node === null) return
      node.value = q ?? ''
    },
    [q],
  )

  return (
    <>
      <div id="sidebar">
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              type="search"
              aria-label="search contacts"
              placeholder="Search"
              name="q"
              defaultValue={q ?? undefined}
              ref={callbackRef}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite" />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length !== 0 ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first ?? contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  )
}
