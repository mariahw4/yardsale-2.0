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
export const QUERY_CHECKOUT = gql`
  query getCheckout($listings: [ID]!) {
    checkout(listings: $listings) {
      session
    }
  }
`;