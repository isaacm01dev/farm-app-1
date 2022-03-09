const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema(
  {

      type: String,
      taskName: String,
      taskDescription: String,
      initDate: String,
      endDate: String,
      user: {type: String}
    }
);


const TaskModel = mongoose.model("task", TaskSchema);
module.exports = TaskModel;