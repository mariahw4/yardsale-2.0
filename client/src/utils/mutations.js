import { gql } from '@apollo/client';

// Mutation to add user
export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    token 
    user {
      _id
      username
    }
  }
}
`;

// Mutation to login user
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

// Mutation to add listing
export const ADD_LISTING = gql`
mutation addListing($newListing: ListingInput!) {
  addListing(newListing: $newListing) 
  {
    title
    description
    price
    
  }
}
`;
