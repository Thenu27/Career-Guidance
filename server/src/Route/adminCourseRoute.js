const express = require('express');
const router = express.Router(); 
const {fetchCourseFields,fetchCourses} = require('../controllers/adminCourseController')

router.route('/courseField').get(fetchCourseFields)
router.route('/courses').get(fetchCourses)

module.exports=router;