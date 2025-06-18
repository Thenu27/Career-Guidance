const express = require('express');
const router = express.Router(); 
const {fetchCareerDetails,fetchAdminTask} = require('../controllers/careerControllers');

router.route('/details').post(fetchCareerDetails);
router.route('/task').post(fetchAdminTask);


module.exports=router; 