const express = require('express');
const router = express.Router(); 
const {fetchCareerDetails} = require('../controllers/careerControllers');

router.route('/details').post(fetchCareerDetails);

module.exports=router;