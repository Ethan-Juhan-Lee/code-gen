import { gql } from '@apollo/client'
export const GET_BOOK = gql`
  query ExampleQuery {
  books {
    title
    author
  }
}
`