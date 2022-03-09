
const isAuthenticated = require('../helpers/isAuthenticated.js');

const express = require('express');
const router = express.Router();

const landController = require('../controllers/landControllers');

// RENDER LAND PAGES : ------------------------

// INSERT NEW LAND ROUTE 
router.get('/newLand', isAuthenticated, landController.renderNewLandPage);

// LIST LAND PAGE ROUTE
router.get('/listLands', isAuthenticated, landController.renderListLandsPage);

// EDIT LAND PAGE ROUTE
router.get('/editLand/update/:id', isAuthenticated, landController.renderEditLandPage);

// --------------------------------------


// SAVE NEW LAND PLOT :
router.post('/newLand', isAuthenticated, landController.saveNewLandPlot);

// UPDATE : SAVE CHANGES ON LAND PLOT :
router.post('/updateLand/:_id', isAuthenticated, landController.updateLandPlot);


// DELETE LAND PLOT :   
router.get('/deleteLand/:_id', isAuthenticated, landController.deleteLandPlot);



module.exports = router; 