
const isAuthenticated = require('../helpers/isAuthenticated.js');
const isLoggedIn = require('../helpers/isLoggedIn.js');


const express = require('express');
const router = express.Router();


const userController = require('../controllers/userControllers');

const passport = require('passport');
const { validateUserLogin, registerValidation } = require('../controllers/userControllers');

// LANDING PAGE ROUTE
router.get('/', userController.renderLandingPage);


// REGISTER : ********************************************

//  RENDER REGISTER ROUTE PAGE 
router.get('/register', isLoggedIn, userController.renderRegisterPage); 

// REGISTER ROUTE SAVE USER DATA :

router.post('/register', userController.saveNewUser);


// LOGIN : ********************************************

// LOGIN ROUTE RENDER PAGE :
router.get('/login', userController.renderLoginPage);

// LOGIN SEND DATA :

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/userCpanel',
  failureRedirect: '/login',
  failureFlash: true
}));



// USER CPANEL PAGE : 
router.get('/userCpanel',isAuthenticated, (req, res, next) => {
  const user = req.session.user_data;
  delete req.session.user_data;
  res.render('distribute/userCpanel');
});

router.post('/updateProfile/:_id', isAuthenticated, userController.updateUserProfile);


// LOGOUT : ********************************************

// LOGOUT ROUTE 

// // SHOULD BE "POST" OR "PUT" FOR SECURITY REASONS, CHECK DOCS *** BUT GIVES ME AN ERROR
// router.post('/logout', userController.renderLogoutPage);
router.get('/logout', isAuthenticated, userController.renderLogoutPage);

module.exports = router;  