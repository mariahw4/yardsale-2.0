// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
const { AuthenticationError } = require('apollo-server-express')
const { User, Book } = require('../models')
const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');

// HINT
// Use the functionality in the user-controller.js as a guide.

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {

                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },

    Mutation: {
        // Create user
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user);
            return { token, user };

        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');

            }

            const token = signToken(user);
            return { token, user };
        },
        
    }

}

module.exports = resolvers; 