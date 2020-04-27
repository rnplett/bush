const Person = require('../models/person');

exports.filterPeople = (req, res, next) => {
  Person.find({ name: { $regex: req.params.filter, $options: 'i' } })
    .then(people => {
      let qlist = [];
      people.forEach((row) => {
        qlist.push({ ...row.toObject()})
      });
      res.send(qlist);
    });  
}