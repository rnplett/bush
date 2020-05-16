const Person = require('../models/person')
// const Cart = require('../models/cart');

exports.home = (req, res, next) => {
  res.redirect('/people');
};

const dtfOptions = { dateStyle: 'medium', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
const dtf = new Intl.DateTimeFormat('en-US', dtfOptions);

exports.getPeople = (req, res, next) => {
  Person.find()
    .then((people) => {
      res.render('browse/people-list', {
        people: people,
        pageTitle: 'People List',
        path: '/people'
      })
    });
};

exports.getPerson = (req, res, next) => {
  const personId = req.params.personId;
  Person.findOne({ _id: personId })
    .populate([{
      path: 'parents'
    },
    {
      path: 'families.spouse'  
    },
    {
      path: 'families.children'
    }])
    .then(person => {
      res.render('browse/person-detail', {
        person: person,
        pageTitle: person.name,
        path: '/person'
      });
    });
};

