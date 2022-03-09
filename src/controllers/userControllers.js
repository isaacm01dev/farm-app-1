const userController = {};

const UserModel = require('../models/MyUserModel');

const flash = require('connect-flash');

const { render } = require('ejs');


const isAuthenticated = require('../helpers/isAuthenticated.js');
const bcrypt = require('bcryptjs');
// RENDER LANDING PAGE: 

userController.renderLandingPage = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('distribute/userCpanel');
  } else {
    res.render('distribute/index');
  }
};

// REGISTER : *************************************************

// RENDER REGISTER PAGE: 
userController.renderRegisterPage = (req, res) => {
  res.render('users/register');
};

// SAVE NEW USER AND LOGIN : ***userRoutes


userController.saveNewUser = async (req, res) => {
  const { userName, email, address, userSector, password, confirm_password } = req.body;

  req.session.user_data = {email, password};
  req.flash('success', 'Now You are Registered')

  let errors = []; 
  // // IF PASSWORDS DO NOT MATCH : 
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match..." });
   
  }
  // IF PASSWORD IS UNDER x CHARACTERS
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
    
    console.log('password must be at least 4 characters');
  }
  // SI NO HAY ERRORES EN NINGUNO DE LOS CAMPOS
  if (errors.length > 0) {
    res.render("users/register", {
      errors,
      userName,
      email,
      password,
      confirm_password,
      address,
      userSector
    });
  } else {
    // // IF MAIL EXISTS IN DB : 
    const userEmail = await UserModel.findOne({ email: email });
    if (userEmail) {
      console.log('...email not valid... it already exists...!!!');
      req.flash("error_msg", "    The Email is already in use...*****");   
      res.redirect("/register"); 
    } else {
      
   
      const newUser = new UserModel({ userName, email, address, userSector, password, confirm_password });
      // *************** PASSWORD ENCRYPTION THROUGH USER MODEL METHOD ********************
      newUser.password = await newUser.encryptUserPassword(password);
      // ANOTHER WAY  *********
      // const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // newUser.password = hashedPassword;
      console.log(req.body);
      await newUser.save(); 
      console.log('user saved successfully !!!');

      req.flash("success_msg", "You are registered!!!");
  
      res.redirect("/login");
      
    }
  }
};


// LOGIN : *************************************************

// RENDER LOGIN PAGE: 
userController.renderLoginPage = (req, res) => {
  res.render('users/login');
};

// VALIDATE USER LOGIN WITH PASSPORT : *** userRoutes

// // ************************************************************

// RENDER LOGOUT PAGE: 
userController.renderLogoutPage = (req, res) => {
  req.logout(); 
  req.flash("success_msg", "...You are logged out now, come back soon!!");
  res.redirect('/'); 
};

userController.updateUserProfile = async (req, res) => {
  const { userName, email, address, userSector, password, confirm_password } = req.body;
  await UserModel.findByIdAndUpdate(req.params._id, { userName, email, address, userSector, password, confirm_password });
  res.redirect('/userCpanel');
}

module.exports = userController;



