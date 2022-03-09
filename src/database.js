// DATABASE CONNECTION FILE : 

const mongoose = require('mongoose');
// import { config } from 'dotenv'; // // *** dotenv *** IS A DEVELOPMENT MODULE!!! NOT A PRODUCTION ONE >>> IT GOES INTO gitignore

// REQUIRE configuration.js FILE :
const configuration = require('./configuration.js');

// REQUIRING ONLY config() METHOD :
const { config } = require("dotenv");

config();

const {  PORT, FARM_APP_MONGODB_HOST, FARM_APP_MONGODB_DATABASE } = require("./configuration.js");


// USE AN IIFE TO EXECUTE CONNECTION : 
(async () => {
    try {
      const db = await mongoose.connect(`mongodb://${FARM_APP_MONGODB_HOST}/${FARM_APP_MONGODB_DATABASE}`); 
      console.log("You are Connectecd to :", db.connection.name, "!!!");
      console.log(`this is from database.js file : port is ${PORT}`);
    } catch (error) {
      console.error(error);
    }
  })();  
