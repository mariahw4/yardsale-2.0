const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Listing {
    id: INT
    title: String!
    description: String!
    price: INT!
    image: String
    date_created: Date!
    user: User
    sold: Boolean!
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

  scalar Date 

  type Listing {
    _id: ID
    title: String
    description: String
    image: String
    quantity: Int
    price: Float
    date_created: Date
    
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
    addListing(listings:[ID]! ): Listing
    addOrder(listings: [ID]!): Order
  }

`;

module.exports = typeDefs;
