const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-person => GET
router.get('/add-person', adminController.getAddPerson);

// /admin/add-person => POST
router.post('/add-person', adminController.postAddPerson);

// /admin/edit-person => GET
router.get('/edit-person/:personId', adminController.getPerson);

// /admin/edit-person => POST
router.post('/edit-person', adminController.postEditPerson);

// /people => GET - General people directory with admin buttons
router.get('/people', adminController.getPeople);

// /delete-person => GET - triggered by button in admin people directory.
router.post('/delete-person', adminController.postDeletePerson);

module.exports = router;