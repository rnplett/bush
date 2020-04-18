const Person = require('../models/person');

exports.filterPeople = (req, res, next) => {
  Person.find({ name: { $regex: req.params.filter, $options: 'i' } })
    .then(people => {
      res.send(people);
    });  
}