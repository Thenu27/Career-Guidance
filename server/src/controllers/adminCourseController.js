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
                       .where('course_id',Number(courseId))

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

const updateAdminCourseChange=async(req,res)=>{
    try{
        console.log('hit')
        console.log(req.body)
     const {
      course_id,
      course_name,
      course_field,
      s1,
      s2,
      s3,
      s4,
      duration,
      fees,
      course_level,
      minimum_level_category,
      title,
      institute,
      institute_website,
      course_url,
      course_university
    } = req.body;
 
    const result = await db('degrees')
                       .where('course_id',Number(course_id))
                       .update({'course_name':course_name,
                                'course_field':course_field,
                                's1':s1,
                                's2':s2,
                                's3':s3,
                                's4':s4,
                                'duration':duration,
                                'fees':fees,
                                'course_level':course_level,
                                'minimum_level_category':minimum_level_category,
                                'title':title,
                                'institute':institute,
                                'website':institute_website,                                
                                'course_url':course_url,
                                'university':course_university

                       })
     
        console.log('result',result)
                   
    if(!result) {
    throw new Error('Course update failed');}
    console.log('Course updated successfully');
    res.status(StatusCodes.OK).json({message:'Course updated successfully'});
                     
    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error updating course: ${err.message}`
        });
    }
}

const AddingAdminCourse=async(req,res)=>{
    console.log(req.body)
    try{
     const {
      course_id,
      course_name,
      course_field,
      s1,
      s2,
      s3,
      s4,
      duration,
      fees,
      course_level,
      minimum_level_category,
      title,
      institute,
      institute_website,
      course_url,
      course_university
    } = req.body;

    const result =await db('degrees')
                       .insert({
                                'course_name':course_name,
                                'course_field':course_field,
                                's1':s1,
                                's2':s2,
                                's3':s3,
                                's4':s4,
                                'duration':duration,
                                'fees':fees,
                                'course_level':course_level,
                                'minimum_level_category':minimum_level_category,
                                'title':title,
                                'institute':institute,
                                'website':institute_website,                                
                                'course_url':course_url,
                                'university':course_university
                       })
     
        console.log('result',result)
        res.status(StatusCodes.OK).json({message:'Course Added successfully'});

    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error updating course: ${err.message}`
        });
    }
}


const deleteAdminCourse=async(req,res)=>{
    try{
        const {courseId} = req.query;
        console.log(courseId)
        const result = await db('degrees')
                       .where('course_id',Number(courseId))
                       .del()
        if(!result) {
            throw new Error('Course deletion failed');
        }
        console.log('Course deleted successfully');
        res.status(StatusCodes.OK).json({message:'Course deleted successfully'});
    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error deleting course: ${err.message}`
        });
    }
}   

const  AddCourseField=async(req,res)=>{
    try{
    const {CourseField} = req.body;
    const result = await db('degrees')
                       .insert({
                                'course_field':CourseField
                       })
    if(!result) {
        throw new Error('Course field addition failed');
    }                  

    res.status(StatusCodes.OK).json({message:'Course field added successfully'});

    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error adding course field: ${err.message}`
        });
    }
}


module.exports={
    fetchCourseFields,
    fetchCourses,
    fetchCourseInfo,
    updateAdminCourseChange,
    AddingAdminCourse,
    deleteAdminCourse,
    AddCourseField
} 