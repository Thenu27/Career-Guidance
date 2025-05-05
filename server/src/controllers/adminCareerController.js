const db = require('../db/connectDB')

const addTaskToDatabase = async(task,careerId)=>{
    try{
        for(let i=0;i<task.length;i++){
            await db('career_tasks').insert({
                career_id: careerId,
                task: task[i]
              });
        }



    }catch(err){
        console.log(err);
        throw err
    }
}

const deleteTasksFromDatabase = async(careerId)=>{
    try{
        const result = await db('career_tasks').where({'career_id':careerId}).del();
        if(!result){
            throw new Error(`No tasks found for career_id ${careerId}`);
        }
    }catch(err){
        console.log(err)
    }
}

module.exports={addTaskToDatabase,deleteTasksFromDatabase}