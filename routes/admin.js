const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-person => GET
router.get('/edit-person', adminController.getAddPerson);

// /admin/add-person => POST
router.post('/edit-person', adminController.postAddPerson);

module.exports = router;
