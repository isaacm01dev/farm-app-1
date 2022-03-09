
const isAuthenticated = require('../helpers/isAuthenticated.js');

const express = require('express');
const router = express.Router();

const infoController = require('../controllers/infoControllers');


// CALENDAR PAGE ROUTE
router.get('/calendar', isAuthenticated, infoController.renderCalendarPage);


// WEATHER PAGE ROUTE
router.get('/weather', isAuthenticated, infoController.renderWeatherPage);


// LOCATION MAP ROUTE 
router.get('/locationMap', isAuthenticated, infoController.renderMapPage);



module.exports = router; 