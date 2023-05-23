const { User, Listing } = require("../models");
const db = require('../config/connection')

const userData = require("./userData.json");
const listingData = require("./listingData.json");

db.once('open', async () => {

    await User.deleteMany();
    await Listing.deleteMany();


   const Users = await User.insertMany(userData)
   const listingSeeds = listingData.map(listing => {
    return {
        ...listing, 
        user: Users[Math.floor(Math.random() * Users.length)]._id,
    }
   })
   console.log(listingSeeds)
    await Listing.insertMany(listingSeeds)
    process.exit(0);
});


