// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
const { AuthenticationError } = require("apollo-server-express");
const { User, Listing, Order } = require("../models");
const { signToken } = require("../utils/auth");
const { sign } = require("jsonwebtoken");
const stripe = require("stripe")(
  "sk_test_51N8oPZGvqFuPYelvE6eMtck6VhzFo5ZWNb2OfbwLUskyZCeGF7Ii2z9ydScJISQXRNZmKQV3eqzORZQlYKAgAWvl00bAHTknrH"
);
const { ObjectId } = require('mongodb')


const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    listings: async () => {
      return await Listing.find().populate("user");
    },
    
        

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ listings: args.listings });
      const line_items = [];

      const { listings } = await order.populate("listings");

      for (let i = 0; i < listings.length; i++) {
        const listing = await stripe.products.create({
          name: listings[i].title,
          description: listings[i].description,
          images: [`${url}/images/${listings[i].image}`],
        });

        //Images need to in public/images

        const price = await stripe.prices.create({
          product: listing.id,
          unit_amount: listings[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    // Create user
    addListing: async (parent, {newListing}, context) => {
      console.log(context.user);
      if (context.user) {
        try {
          const user = await User.findById(context.user._id)
          newListing.user = user

          const listing = await Listing.create(newListing)
          return listing
          
        } catch (error) {

          throw new Error(error)
        }
          
      }
  },
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user);
      return { token, user };
  },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addOrder: async (parent, { listings }, context) => {
      if (context.user) {
        const order = new Order({ listings });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;