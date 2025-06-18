const express = require('express');
const router = express.Router();
const {AddingAdminSpatialization}=require('../controllers/adminSpatializationController')

router.route('/add').post(AddingAdminSpatialization)


module.exports=router;