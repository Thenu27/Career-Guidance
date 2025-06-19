const express = require('express');
const router = express.Router(); 
const {addAdminCareerField,fetchAdminCareerField,fetchAdminCareersForField,deleteAdminCareerField,addAdminCareer,UpdateAdminCareer,fetchAdminCareerDetails,deleteAdminCareer} = require('../controllers/adminCareerController');  

router.route('/careerfield').get(fetchAdminCareerField);
router.route('/careerfield/add').post(addAdminCareerField);
router.route('/careerfield/career/add').post(addAdminCareer);
router.route('/careerfield/delete').post(deleteAdminCareerField);
router.route('/careerfield/all-careers').post(fetchAdminCareersForField)
router.route('/careerfield/career/update').post(UpdateAdminCareer)
router.route('/careerfield/career/details').post(fetchAdminCareerDetails)
router.route('/careerfield/career/delete').post(deleteAdminCareer)


module.exports=router;