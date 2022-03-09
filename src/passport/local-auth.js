const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const crypto = require('crypto');

const User = require('../models/MyUserModel.js');

// // **********************************************************
// // **********************************************************

// SERIALIZE AND DESERIALIZE USER : 

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async(id, done) => { 
  const user = await User.findById(id);
  done(null, user); 
});

// // ********************************************************
// // ********************************************************

// LOCAL REGISTER : 

passport.use('local-register', new LocalStrategy({ 
  usernameField: 'email', 
  passwordField: 'password', 
  passReqToCallback: true 
}, async (req, email, password, done) => {

  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
   
    return done(null, false, {signupMessage: 'This email is already being used...'});
  } else {
    const newUser = new User(); 
    newUser.email = email;
    newUser.password = newUser.encryptUserPassword(password); 
  console.log(newUser)
    await newUser.save(); 
    done(null, newUser); 
  }
}));

// // **********************************************************
// // LOCAL-LOGIN :

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    console.log('no user found');
    return done(null, false, req.flash('signinMessage', ' Sorry, no user found with this email...'));
  }
  
  const match = await user.compareUserPassword(password);
  
  if(match) {
    return done(null, user);
  } else {
    console.log('incorrect password....ooops');
    return done(null, false, req.flash('signinMessage', 'Incorrect password...Please try again.'));
  }
 
 
}));

