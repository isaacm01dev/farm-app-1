
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // ACCESO PERMITIDO
  } // SINO ERROR : Y REDIRECCIONAME PARA LOGEARME
  req.flash("error_msg", "...Please sign in to display any information or making changes.");
  res.redirect('/login'); // desde aqui ira ra register si hace falta
};



module.exports = isAuthenticated;
// module.exports = isLoggedIn;