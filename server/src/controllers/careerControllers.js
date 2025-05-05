const db = require('../db/connectDB');

const fetchCareerDetails=async(req,res)=>{
    try{
        const {selectedCareer} = req.body;
        console.log(selectedCareer);
        const result = await db('career_table').where({career:selectedCareer});

        if(!result.length){
            return res.status(404).json({message:"Career not found"});
        }
        console.log(result)
        return res.status(200).json(result);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }

}

const fetchAdminTask=async(careerId)=>{
    try{ 
        const response = await db.select('*').from('career_tasks').where('career_id',careerId);
        console.log("CareerTask:",response)
        return response
    }catch(error){
        console.log("Error when fetching Careers Tasks from DB",error);
        throw error;
    }
}



module.exports={fetchCareerDetails,fetchAdminTask};