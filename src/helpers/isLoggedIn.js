
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/logout');
    console.log('logout first!!!');
    req.flash("error_msg", "PLEASE LOGOUT FIRST");
  }

  return next();

};


module.exports = isLoggedIn;
