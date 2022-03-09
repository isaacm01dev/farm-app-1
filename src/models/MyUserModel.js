// *** MONGOOSE VERSION 6.1.8

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const passport = require("passport");

// NEW SCHEMA INSTANCE : 

const UserSchema = new Schema(
  {
    userName: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: String,
    userSector: String,
    userPlots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'land'
      }
    ],

    userTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'task'
      }
    ]
  }
);

// ENCRYPT USER PASSWORD METHOD: 
UserSchema.methods.encryptUserPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  // const salt = await bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
};

// CHECK IF PASSWORDS MATCH : 
UserSchema.methods.compareUserPassword = async function (password) {

  return await bcrypt.compare(password, this.password);

};

const UserModel = mongoose.model("UserModel_1", UserSchema);
module.exports = UserModel;
