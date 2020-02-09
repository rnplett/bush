const Person = require('../models/person');

exports.getAddPerson = (req, res, next) => {
  res.render('admin/edit-person', {
    pageTitle: 'Add Person',
    path: '/admin/add-person',
    editing: false
  });
};

exports.postAddPerson = (req, res, next) => {
  const name = req.body.name;
  const birthdate = req.body.birthdate;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const person = new Person(name, birthdate, imageUrl, description);
  person.save();
  res.redirect('/');
};

