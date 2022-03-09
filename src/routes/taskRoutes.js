
const isAuthenticated = require('../helpers/isAuthenticated.js');

const express = require('express');
const router = express.Router();
// const router = require('express').Router();

const taskController = require('../controllers/taskControllers');

// RENDER TASK PAGES : ------------------------

// SAVE NEW TASK :
router.post('/newTask', isAuthenticated, taskController.saveNewTask);

// LIST TASK PAGE ROUTE
router.get('/listTasks', isAuthenticated, taskController.renderListTasksPage);

// EDIT task PAGE ROUTE
router.get('/editTask/update/:id', isAuthenticated, taskController.renderEditTaskPage);
// --------------------------------------


// SAVE NEW TASK :
router.post('/newTask', isAuthenticated, taskController.saveNewTask);

// UPDATE : SAVE CHANGES ON TASK :
router.post('/updateTask/:_id', isAuthenticated, taskController.updateTask);

// DELETE TASK PLOT : 
router.get('/deleteTask/:_id', isAuthenticated, taskController.deleteTask);










// INSERT NEW TASK ROUTE 
router.get('/newTask', /*isAuthenticated,*/ taskController.renderNewTaskPage);

// router.post('/newTask', taskController.createNewTask);

// DELETE TASK 

router.delete ('/deleteTask/:id', taskController.updateTask); 

module.exports = router; 