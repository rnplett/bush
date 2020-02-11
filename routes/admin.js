const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/edit-person => GET
router.get('/add-person', adminController.getAddPerson);

// /admin/edit-person => POST
router.post('/add-person', adminController.postAddPerson);

router.get('/edit-person/:personId', adminController.getPerson);

// /admin/edit-person => POST
router.post('/edit-person', adminController.postEditPerson);

router.get('/people', adminController.getPeople);

router.post('/delete-person', adminController.postDeletePerson);

module.exports = router;