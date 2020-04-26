const dateFormat = require('dateformat');

const Person = require('../models/person');

exports.gethome = (req, res, next) => {
  res.render('admin/home', {
    pageTitle: 'Shrub',
    path: '/admin/home',
    editing: false
  });
};

exports.getPeople = (req, res, next) => {
  Person.find()
    .then(people => {
      res.render('admin/edit-people-list', {
        people: people,
        pageTitle: 'People List',
        path: 'admin/people'
      })
    });
};

exports.postFilterPeople = (req, res, next) => {
  Person.find({ name: { $regex: req.body.filterText, $options: 'i' } })
    .then(people => {
      res.render('admin/edit-people-list', {
        people: people,
        pageTitle: 'People List',
        path: 'admin/people'
      })
    });
};

exports.postFilterPeopleAPI = (req, res, next) => {
  res.send(req);
  Person.find({ name: { $regex: req.query.filterText, $options: 'i' } })
    .then(people => {
      console.log(people)
      res.send(people)
    })
    .catch(err => {
      console.log(err)
    })
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
  const person = new Person({ name: name, birthdate: birthdate, imageUrl: imageUrl, description: description });
  person
    .save()
    .then(result => {
      console.log('Person Created!')
      res.redirect('/admin/edit-people-list')
    })
    .catch(err => {
      console.log(err)
    });
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
  Person.findById(personId)
    .then(person => {
      person.name = name;
      person.birthdate = birthdate;
      person.imageUrl = imageUrl;
      person.description = description;
      return person.save();
    })
    .then(result => {
      console.log('Person Updated!');
      res.redirect('/person/' + personId);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeletePerson = (req, res, next) => {
  const personId = req.body.personId;
  Person.findByIdAndRemove(personId)
    .then(() => {
      console.log('DELETED PERSON!');
      res.redirect('/admin/people');
    })
    .catch(err => console.log(err));

};