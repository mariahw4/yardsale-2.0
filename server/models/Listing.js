const { Schema, model } = require("mongoose");

// class Listing extends Model {}

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    date_created: {
      type: Date,
      required: false,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sold: {
      type: Boolean,
      default: false,
    },

  },

);

const Listing = model("Listing", listingSchema);
module.exports = Listing;
