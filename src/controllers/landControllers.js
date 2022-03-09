const landController = {};

const { authenticate } = require('passport');
const LandModel = require('../models/LandModel.js');


// RENDER EDIT LAND PAGE: 
landController.renderEditLandPage = async (req, res) => {
  const userLand = await LandModel.findById(req.params.id).lean();

  res.render('management/editLand', {userLand});
};


// RENDER LIST LANDS PAGE: 
landController.renderListLandsPage = async (req, res) => {
    const landList = await LandModel.find({ user: req.user.id })
      .sort({ date: "desc" })
      .lean();
    res.render('management/listLands', {landList});
  };


// RENDER INSERT NEW LAND PAGE: 
landController.renderNewLandPage = (req, res) => {
  res.render('management/newLand');
};

// SAVE NEW LAND : ------------------------------


landController.saveNewLandPlot = async (req, res) => {
  const { plotName, plotSurface, irrigation, irrigation2, crops, production, latitude, longitude } = req.body; 
  const newLand = new LandModel({ plotName, plotSurface, irrigation, irrigation2, crops, production, latitude, longitude });
  
  newLand.user = req.user._id; 
  console.log(` this is user :${req.user}`);
  await newLand.save();
  console.log(newLand);

  res.redirect('/newLand');
};

// UPDATE LAND PLOT : --------------------------

landController.updateLandPlot = async (req, res) => {
  const { plotName, plotSurface, irrigation, irrigation2, crops, production, latitude, longitude } = req.body;
  await LandModel.findByIdAndUpdate(req.params._id, { plotName, plotSurface, irrigation, irrigation2, crops, production, latitude, longitude });
  console.log(LandModel);
  res.redirect('/listLands');
}

// DELETE LAND PLOT : -------------------------

landController.deleteLandPlot = async (req, res, next) => {
  console.log('funciona LAND???');
  console.log('this is req.params:',req.params);
  
  let { _id } = req.params;
  await LandModel.remove({ _id: _id }); 

  res.redirect('/listLands');
  };


module.exports = landController;
