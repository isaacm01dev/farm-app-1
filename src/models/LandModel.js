const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LandSchema = new Schema(
  {
    // userPlot: {
 
      plotName: String,
      plotSurface: Number,
      irrigation: String,
      crops: String,
      production: String,
      latitude: Number,
      longitude: Number,
      user: {type: String},
  }
);


const LandModel = mongoose.model("land", LandSchema);
module.exports = LandModel;