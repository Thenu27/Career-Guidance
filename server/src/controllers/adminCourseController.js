const db = require('../db/connectDB')
const { StatusCodes } = require('http-status-codes'); 

const fetchCourseFields = async (req,res) => {
    console.log('course is hit')
    try {
        const result = await db('degrees')
            .distinct('course_field')

        if (!result || result.length === 0) {
            throw new Error('No course fields found');
        }
        console.log(result)
        res.status(StatusCodes.OK).json({field:result})
    } catch (err) {
        console.log(err)
        throw new Error(`Error fetching course fields: ${err.message}`);
    }
};


module.exports={
    fetchCourseFields
}