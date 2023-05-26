import { gql } from '@apollo/client';

// Query to get users
export const GET_USER = gql`
  query user {
    user {
      _id
      username
      email
      listings {
        _id
        title
        description
        image
        quantity
        price
        date_created
      }
    }
  }
`;

// Query to get listings
export const GET_LISTINGS = gql`
  query getListings { 
    listings {
      _id
      title
      description
      image
      quantity
      price
      date_created
      user {
        _id
        username
      }
  }
}`

// Query to checkout
export const QUERY_CHECKOUT = gql`
  query getCheckout($listings: [ID]!) {
    checkout(listings: $listings) {
      session
    }
  }
`