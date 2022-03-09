const infoController = {};

const UserModel = require('../models/MyUserModel');

// RENDER WEATHER PAGE: 
infoController.renderWeatherPage = (req, res) => {
  res.render('displayinfo/weather');
};

// RENDER LOCATION MAP PAGE: 
infoController.renderMapPage = (req, res) => {
  res.render('displayinfo/locationMap');
};

// RENDER CALENDAR PAGE: 
infoController.renderCalendarPage = (req, res) => {
  res.render('displayinfo/calendar');
};




module.exports = infoController;
