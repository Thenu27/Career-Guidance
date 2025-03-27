const express = require('express');
const router = express.Router(); // ✅ Capital "R" and it's a function
const {sendEmail} = require('../controllers/emailController');

router.route('/').post(sendEmail);

module.exports=router