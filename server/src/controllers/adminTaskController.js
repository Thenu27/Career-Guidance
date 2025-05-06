const db = require('../db/connectDB');

const deleteAdminCareerTask = async(taskId)=>{
    try{
        const result = await db('career_tasks').where('task_id',taskId).del();
        if (result === 0) {
            throw new Error('Task not found or already deleted');
          }
        console.log('Task deleted successfully');
        return result;
    }catch(err){
        console.log(err)
    }
}


const updateOrInsertCareerTasks = async (career_id, tasks) => {
  try{
    let count = 0;
    for (const task of tasks) {
      if (task.task_id) {
        await db('career_tasks')
          .where({ task_id: task.task_id })
          .update({ task: task.task });
      } else {
        await db('career_tasks')
          .insert({ career_id, task: task.task });
      }
      count++;
    }
    return count; // ✅ return count so backend can check
  }catch(err){
    console.log(err)
    throw new Error("Error updating tasks")

  }

};


//This is when career id is changed
const updateInserTasksWhenIdChanged = async (NewCareerId, tasks) => {
  try{
    let count = 0;
    for (const task of tasks) {
      if (task.task_id) {
        await db('career_tasks')
          .where({ task_id: task.task_id })
          .update({ task: task.task,
                    career_id:NewCareerId
           });
      } else {
        await db('career_tasks')
          .insert({ career_id:NewCareerId ,task: task.task });
      }
      count++;
    }
    return count; // ✅ return count so backend can check
  }catch(err){
    console.log(err)
    throw new Error("Error updating tasks")

  }

};

  

module.exports = {deleteAdminCareerTask,updateOrInsertCareerTasks,updateInserTasksWhenIdChanged}