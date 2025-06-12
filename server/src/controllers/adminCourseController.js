const db = require('../db/connectDB')
const { StatusCodes } = require('http-status-codes'); 

const fetchCourseFields = async (req,res) => {
    try {
        const result = await db('degrees')
            .distinct('course_field')

        if (!result || result.length === 0) {
            throw new Error('No course fields found');
        }
        console.log(result)
        res.status(StatusCodes.OK).json({field:result})
    } catch (err) {
        console.error('DB Error:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error fetching courses: ${err.message}`
        });
    }
};


const fetchCourses = async (req,res) => {
    console.log('course is hit')
    const {field } = req.query;

    try {
        const result = await db('degrees')
            .select('course_name','course_id')
            .where('course_field',field)

        if (!result || result.length === 0) {
            throw new Error('No courses found');
        }
        console.log(result)
        res.status(StatusCodes.OK).json({courses:result})
    } catch (err) {
        console.error('DB Error:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error fetching course fields: ${err.message}`
        });
    }
}


const fetchCourseInfo=async(req,res)=>{
    try{

        const {courseId} = req.query;

        const result = await db('degrees')
                       .select("*")
                       .where('course_id',courseId)

        if(!result || result.length === 0) {
            throw new Error('No courses info Dound');
        }
        console.log(result)
        res.status(StatusCodes.OK).json({course_info:result})              

    }catch(err){
        console.error('DB Error:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error fetching course Info: ${err.message}`
        });
    }
}





module.exports={
    fetchCourseFields,
    fetchCourses,
    fetchCourseInfo
}