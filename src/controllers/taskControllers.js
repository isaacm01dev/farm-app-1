const taskController = {};

const { authenticate } = require('passport');

const TaskModel = require('../models/TaskModel.js');




// RENDER EDIT TASK PAGE: 
taskController.renderEditTaskPage = async (req, res) => {
  const userTask = await TaskModel.findById(req.params.id).lean();

  res.render('management/editTask', {userTask});
};

// ---------------------------------------------------
// RENDER LIST LANDS PAGE: 
taskController.renderListTasksPage = async (req, res) => {
    const taskList = await TaskModel.find({ user: req.user.id })
      .sort({ date: "desc" })
      .lean();
    res.render('management/listTasks', {taskList});
  };

 // ---------------------------------------------------
 // RENDER INSERT NEW TASK PAGE: 
 taskController.renderNewTaskPage = (req, res) => {
   res.render('management/newTask');
 };

 // SAVE NEW TASK : --------------------------

 taskController.saveNewTask = async (req, res) => {
   const { taskName, taskDescription, initDate, endDate } = req.body; 
   console.log(req.body);
   const newTask = new TaskModel({  taskName, taskDescription, initDate, endDate });
   
 
   newTask.user = req.user.id; 
   console.log(` this is TASK :${req.user.task}`);
   await newTask.save();
   console.log(newTask);

   res.redirect('/newTask');
 };

 // UPDATE TASK : ------------------------------------
 
 taskController.updateTask = async (req, res) => {
   const { taskName, taskDescription, initDate, endDate } = req.body;
   await TaskModel.findByIdAndUpdate(req.params._id, { taskName, taskDescription, initDate, endDate });
   console.log(TaskModel);
   res.redirect('/listTasks'); 
 }
 
 // DELETE TASK : -------------------------
 
 taskController.deleteTask = async (req, res, next) => {
   console.log('funciona Tasks???');
   console.log('this is req.params:',req.params);
  
   let { _id } = req.params;
   await TaskModel.remove({ _id: _id }); 
 
   res.redirect('/listTasks');
   };
 

 module.exports = taskController;





