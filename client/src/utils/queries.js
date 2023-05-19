import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }

    
  }
`;

export const GET_LISTING = gql`
  listing {
    _id
    title
    description
    image
    quantity
    price
}`

export const QUERY_CHECKOUT = gql`
  query getCheckout($listings: [ID]!) {
    checkout(listings: $listings) {
      session
    }
  }
`

export const ADD_LISTING = gql`
mutation addListing($listings: [ID]!) {
  addListing(listings: $listings)
}`;