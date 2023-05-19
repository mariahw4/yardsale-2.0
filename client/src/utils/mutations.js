import { gql } from '@apollo/client';


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

export const ADD_LISTING = gql`
mutation addListing($listings: [ID]!) {
  addListing(listings: $listings)
}
`;
