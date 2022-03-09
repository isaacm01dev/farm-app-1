
const { config } = require("dotenv"); 

config();



  //PORT : 
  const PORT = process.env.PORT || 3500;  
  // const PORT = process.env.PORT; // port is undefined ...
  // HOST : 
  const FARM_APP_MONGODB_HOST = process.env.FARM_APP_MONGODB_HOST || "localhost:27017";

  // DATABASE : 
  const FARM_APP_MONGODB_DATABASE = process.env.MONGODB_DB || "test01";

                  
module.exports = {  PORT, FARM_APP_MONGODB_HOST, FARM_APP_MONGODB_DATABASE }; 