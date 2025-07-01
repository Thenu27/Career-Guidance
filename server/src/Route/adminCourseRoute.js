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
        fetchAllInstitutes
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


module.exports=router;