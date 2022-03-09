const express = require('express');

const morgan = require('morgan');

const path = require('path'); // TELLS WHERE ARE THE FILES IN THE OPERATING SYSTEM 
const passport = require('passport');
const session = require('express-session');


const flash = require('connect-flash');
const methodOverride = require('method-override');


// INITIALIZATIONS : 
const app = express();

require('./database');

// REQUIRE local-auth FUNCTIONALITY TO AUTHENTICATE REGISTER AND LOGIN 
require('./passport/local-auth');


// IMPORT ROUTES : ***************************

const userRoutes = require('./routes/userRoutes');
const landRoutes = require('./routes/landRoutes');
const taskRoutes = require('./routes/taskRoutes');
const infoRoutes = require('./routes/infoRoutes');

// APP SETTINGS :

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

// SET THE VIEW ENGINE TO <%=ejs%> :

app.set('view engine', 'ejs');

// MIDDLEWARES : 

app.use(morgan('dev'));


app.use(express.urlencoded({extended: false})); 
app.use(methodOverride("_method"));

app.use(session({
  
  secret: 'mySecretSession',
  resave: false,
  saveUninitialized: true 
}));

app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(flash()); 

// GLOBAL VARIABLES : -------------------
app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.loginMessage = req.flash('loginMessage');
  app.locals.successMessage = req.flash('success');
  app.locals.user = req.user || null;
  app.locals.land = req.plotTasks || null;



  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});


// ROUTES
app.use('/', userRoutes);
app.use('/', landRoutes);
app.use('/', taskRoutes);
app.use('/', infoRoutes);


// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


// STARTING THE SERVER
app.listen(app.get('port'), () => {
  console.log(`App SERVER on port ${app.get('port')}...!!!`); 
});

module.exports = app;