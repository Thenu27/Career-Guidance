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

module.exports={fetchCareerDetails};