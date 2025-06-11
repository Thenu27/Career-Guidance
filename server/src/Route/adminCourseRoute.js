const express = require('express');
const router = express.Router(); 
const {fetchCourseFields} = require('../controllers/adminCourseController')

router.route('/courseField').get(fetchCourseFields)

module.exports=router;