const db = require('../db/connectDB')
const { StatusCodes } = require('http-status-codes'); 

const fetchCourseFields = async (req,res) => {
    try {
        const result = await db('course_field')
            .select('*')

        if (!result || result.length === 0) {
            throw new Error('No course fields found');
        }
        // console.log(result)
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
    const {SelectedCourseFieldId,SelectedInstituteId} = req.body;
    console.log('SelectedCourseFieldId',SelectedCourseFieldId)
    console.log('SelectedInstituteId',SelectedInstituteId)

    try {
        const result = await db('degrees')
            .select('course_name','course_id')
            .where('institute_id',SelectedInstituteId)
            .andWhere('course_field_id',SelectedCourseFieldId)

        if (!result || result.length === 0) {
            throw new Error('No courses found');
        }
        // console.log(result)
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

        const specialization_names = await db('specializations')
        .select('id','name')
        .where(function () {
            this.where('id', result[0].specialization_1)
                .orWhere('id', result[0].specialization_2)
                .orWhere('id', result[0].specialization_3)
                .orWhere('id', result[0].specialization_4);
        });

        if(!specialization_names || specialization_names.length === 0) {
            throw new Error('No specializations found for the course');
        }
        // console.log(result)
        // console.log('specialization_names',specialization_names)

        res.status(StatusCodes.OK).json({course_info:result,specialization_names:specialization_names});              

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
                                'specialization_1':s1,
                                'specialization_2':s2,
                                'specialization_3':s3,
                                'specialization_4':s4,
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
     
        // console.log('result',result)
                   
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
      website,
      course_url,
      university,
      institute_id
    } = req.body;

    const result =await db('degrees')
                       .insert({
                                'course_name':course_name,
                                'course_field_id':course_field,
                                'specialization_1':s1,
                                'specialization_2':s2,
                                'specialization_3':s3,
                                'specialization_4':s4,
                                'duration':duration,
                                'fees':fees,
                                'course_level':course_level,
                                'minimum_level_category':minimum_level_category,
                                'title':title,
                                'institute':institute,
                                'website':website,                                
                                'course_url':course_url,
                                'university':university,
                                'institute_id':institute_id
                       })
     
        // console.log('result',result)
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
    const result = await db('course_field')
                       .insert({
                                'course_field_name':CourseField
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

const fetchAllSpecializations = async (req, res) => {
    try{
        const result = await db('specializations')
            .select('*')
        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No specializations found' });
        }
        // console.log(result);

        res.status(200).json({ specializations: result });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const fetchAdminCourseSpecialization = async (req, res) => {
    try {
        const {course_id} = req.body; 
        const result = await knex('degrees')
        .select('specialization_1','specialization_2','specialization_3','specialization_4')
        .where('course_id', course_id);

        if(!result || result.length === 0) {
            return res.status(404).json({ error: 'No specializations found for the given course_id' });
        }
        // console.log(result)

        res.status(200).json({specialization:result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};  

    const deleteCourseField=async(req,res)=>{
        try{
            const {courseFieldId} = req.body;
                    console.log(courseFieldId)

                    const result2 = await db('degrees')
                                .where({'course_field_id':courseFieldId}).del()

                    const result = await db('course_field')
                    .where({'course_field_id':courseFieldId}).del()




            if(!result || result.length === 0) {
                throw new Error('Course Field deletion failed');
            }
            res.status(200).json({result})
        }catch(err){
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });        
        }
    }


const fetchAllInstitutes = async (req, res) => {
    try {
        const result = await db('institute_table')
            .select('*');
        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No institutes found' });
        }
        // console.log(result)
        res.status(200).json({ institutes: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const AddAdminInstitute = async (req, res) => {
    try {
        const { InstituteFullName, InstituteAcronym, InstituteWebSite } = req.body;
        const result = await db('institute_table')
            .insert({
                'institute_name': InstituteFullName,
                'institute_acronym': InstituteAcronym,
                'institute_website': InstituteWebSite
            });
        if (!result) {
            throw new Error('Institute addition failed');
        }
        res.status(StatusCodes.OK).json({ message: 'Institute added successfully' });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error adding institute: ${err.message}`
        });
    }
}

const fetchInstituteDataToEdit=async(req,res)=>{
    try{
        const { institute_id } = req.body;
        console.log('institute_id',institute_id)
        const result = await db('institute_table')
            .select('*')
            .where('institute_id', Number(institute_id));

        if (!result || result.length === 0) {
            throw new Error('No institute data found for the given ID');
        }
        // console.log(result)
        res.status(StatusCodes.OK).json({ instituteData: result[0] });  
    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error fetching institute data to edit: ${err.message}`
        });
    }
}

const EditInstituteDataAdmin=async(req,res)=>{
    try{
        const { 
 
            InstituteFullName,
            InstituteAcronym,
            InstituteWebSite,
            InstituteId

        } = req.body;

        const result = await db('institute_table')
            .where('institute_id',InstituteId)
            .update({
                'institute_name': InstituteFullName,
                'institute_acronym': InstituteAcronym,
                'institute_website': InstituteWebSite
            });

        if (!result) {
            throw new Error('Institute update failed');
        }
        console.log('Institute updated successfully');
        res.status(StatusCodes.OK).json({ message: 'Institute updated successfully' });
    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error updating institute: ${err.message}`
        });
    }
}

const fetchCourseFieldNameToEdit = async (req, res) => {
    try{
        const { id } = req.body;
        console.log('courseFieldId to Edit',id)
        const result = await db('course_field')
            .select('*')
            .where('course_field_id', Number(id));

        if (!result || result.length === 0) {
            throw new Error('No course field data found for the given ID');
        }
        // console.log(result)
        res.status(StatusCodes.OK).json( result[0] );
    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error fetching course field data to edit: ${err.message}`
        });
    }
}


const EditCourseFieldName = async (req, res) => {
    try{
        const { CourseFieldName, CourseFieldId } = req.body;
        console.log('CourseFieldName',CourseFieldName)
        console.log('CourseFieldId',CourseFieldId)

        const result = await db('course_field')
            .where('course_field_id', Number(CourseFieldId))
            .update({ 'course_field_name': CourseFieldName });

        if (!result) {
            throw new Error('Course field name update failed');
        }
        console.log('Course field name updated successfully');
        res.status(StatusCodes.OK).json({ message: 'Course field name updated successfully' });

    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error updating course field name: ${err.message}`
        });
    }
}

const deleteInstituteAndCourses = async (req, res) => {
    try{
        const { instituteId } = req.body;
        console.log('instituteId to delete',instituteId)

        // Delete courses associated with the institute
        const coursesDeleted = await db('degrees')
            .where('institute_id', Number(instituteId))
            .del();


        // Delete the institute
        const instituteDeleted = await db('institute_table')
            .where('institute_id', Number(instituteId))
            .del();

        if (instituteDeleted === 0) {
            throw new Error('Institute deletion failed');
        }

        console.log('Institute and associated courses deleted successfully');
        res.status(StatusCodes.OK).json({ message: 'Institute and associated courses deleted successfully' });
    }catch(err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error deleting institute and courses: ${err.message}`
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
    AddCourseField,
    fetchAllSpecializations,
    fetchAdminCourseSpecialization,
    deleteCourseField,
    fetchAllInstitutes,
    AddAdminInstitute,
    fetchInstituteDataToEdit,
    EditInstituteDataAdmin,
    fetchCourseFieldNameToEdit,
    EditCourseFieldName,
    deleteInstituteAndCourses
} 