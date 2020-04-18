const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

// /admin/add-person => GET
router.post('/filterPeople/:filter', apiController.filterPeople);

module.exports = router;