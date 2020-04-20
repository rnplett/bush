const path = require('path');

const express = require('express');

const browseController = require('../controllers/browse');

const router = express.Router();

router.get('/', browseController.home);

router.get('/people', browseController.getPeople);

router.get('/person/:personId', browseController.getPerson);

module.exports = router;
