const { User, Listing } = require("../models");
const db = require('../config/connection')

const userData = require("./userData.json");
const listingData = require("./listingData.json");

db.once('open', async () => {

    await User.deleteMany();
    await Listing.deleteMany();


    await Listing.insertMany(listingData)
    await User.insertMany(userData)
    process.exit(0);
});


