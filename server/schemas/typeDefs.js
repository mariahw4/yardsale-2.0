const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    listings: [Listing]
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
    user: User
    
  }

  input ListingInput {
    title: String
    description: String
    image: String
    price: Float
    
  }


  type Checkout {
    session: ID
  }

  type Query {
    user: User
    checkout(listings: [ID]!): Checkout
    listings: [Listing]
    profileListings: [Listing]
}

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addListing(newListing: ListingInput! ): Listing
    addOrder(listings: [ID]!): Order
  }

`;

module.exports = typeDefs;