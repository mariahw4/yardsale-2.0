import { gql } from '@apollo/client';

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

// export const GET_USERS_LISTINGS = gql`
//   query getListings($user: ID) { 
//     listings(user: $user) {
//       _id
//       title
//       description
//       image
//       quantity
//       price
//       date_created
//       user {
//         _id
//         username
//       }
//   }
// }`

export const QUERY_CHECKOUT = gql`
  query getCheckout($listings: [ID]!) {
    checkout(listings: $listings) {
      session
    }
  }
`