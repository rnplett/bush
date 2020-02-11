const Person = require('../models/person');
const getDb = require('../util/database');

exports.gethome = (req, res, next) => {
  res.render('admin/home', {
    pageTitle: 'Shrub',
    path: '/admin/home',
    editing: false
  });
};

exports.getPeople = (req, res, next) => {
  Person.fetchAll()
    .then(people => {
      res.render('admin/people', {
        people: people,
        pageTitle: 'People List',
        path: 'admin/people'
      })
    });
};

exports.getAddPerson = (req, res, next) => {
  res.render('admin/edit-person', {
    pageTitle: 'Add Person',
    path: '/admin/edit-person',
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
  res.redirect('/admin/people');
};

exports.getPerson = (req, res, next) => {
  Person.findById(req.params.personId)
    .then(person => {
      res.render('admin/edit-person', {
        pageTitle: 'Edit Person',
        path: '/admin/edit-person',
        person: person,
        editing: true
      });
    });
};

exports.postEditPerson = (req, res, next) => {
  const personId = req.body.personId;
  const name = req.body.name;
  const birthdate = req.body.birthdate;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const person = new Person(name, birthdate, imageUrl, description, personId);
  person.save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/people');
    })
    .catch(err => console.log(err));
};

exports.postDeletePerson = (req, res, next) => {
  const personId = req.body.personId;
  Person.deleteById(personId)
    .then(() => {
      console.log('DELETED PERSON!');
      res.redirect('/admin/people');
    })
    .catch(err => console.log(err));

};