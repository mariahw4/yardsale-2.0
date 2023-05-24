const { Schema, model } = require("mongoose");
// const sequelize = require("../config/connection");

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
      // required: true,
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
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // image: {
    //   type: DataTypes.STRING(100),
    //   // allowNull: false,
    // },
    // quantity: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 1
    // },
    // date_created: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
    // sold: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
  },
  {
    // sequelize,
    // timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: "Listing",
  }
);

const Listing = model("Listing", listingSchema);
module.exports = Listing;
