const express = require('express');
const router = express.Router(); 
const {fetchCourseFields,
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
    } = require('../controllers/adminCourseController')

router.route('/courseField').get(fetchCourseFields)
router.route('/courses').post(fetchCourses)
router.route('/course-details').get(fetchCourseInfo)
router.route('/course-update').post(updateAdminCourseChange)
router.route('/course-add').post(AddingAdminCourse)
router.route('/course-delete').delete(deleteAdminCourse)
router.route('/course-field-add').post(AddCourseField)
router.route('/specialization').get(fetchAllSpecializations)
router.route('/coursefield/delete').post(deleteCourseField)
router.route('/institutes').get(fetchAllInstitutes)
router.route('/institutes/add').post(AddAdminInstitute)
router.route('/institutes/edit').post(fetchInstituteDataToEdit)
router.route('/institutes/edit2').post(EditInstituteDataAdmin)
router.route('/coursefield/edit').post(fetchCourseFieldNameToEdit)
router.route('/coursefield/edit/name').post(EditCourseFieldName)
router.route('/institutes/delete').post(deleteInstituteAndCourses)


    

module.exports=router;