const express = require('express');
const router = express.Router(); 
const {fetchCourseFields,fetchCourses,fetchCourseInfo} = require('../controllers/adminCourseController')

router.route('/courseField').get(fetchCourseFields)
router.route('/courses').get(fetchCourses)
router.route('/course-details').get(fetchCourseInfo)

module.exports=router;