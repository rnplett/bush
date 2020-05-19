const Person = require('../models/person');
const Family = require('../models/family');

exports.filterPeople = (req, res, next) => {
  Person.find({ name: { $regex: req.params.filter, $options: 'i' } })
    .populate({
      path: 'parents',
      model: 'Family',
      populate: {
        path: 'parents',
        model: 'Person'
      }
    })
    .then(people => {
      //console.log(JSON.stringify(people,null,2));
      let qlist = [];
      people.forEach((row) => {
        qlist.push({ ...row.toObject()})
      });
      res.send(qlist);
    });  
}
