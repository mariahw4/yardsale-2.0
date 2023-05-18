const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    listings: [Listing]
  }

  type Listing {
    _id: ID
    title: String
    description: String
    image: String
    quantity: Int
    price: Float
    
  }

  type Checkout {
    session: ID
  }

  type Query {
    me: User
    checkout(listings: [ID]!): Checkout
    listings: [Listing]
}

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(listings: [ID]!): Order
  }

`;

module.exports = typeDefs;
