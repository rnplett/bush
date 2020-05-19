const dateFormat = require('dateformat');

const Person = require('../models/person');
const Family = require('../models/family');

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
    .populate([{
      path: 'parents',
      model: Family,
      populate: {
        path: 'parents',
        model: Person
      }
    },
    {
      path: 'families.spouse'
    },
    {
      path: 'families.children'
    }])
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
  Person.findById(personId)
    .then(person => {
      person.name = req.body.name;
      person.birthdate = req.body.birthdate;
      person.deathdate = req.body.deathdate
      person.imageUrl = req.body.imageUrl;
      person.description = req.body.description;
      let m = null;
      let newFamilies = {};
      for (p in req.body) {
        m = p.match(/new(.*)-(.*)-(.*)/);
        if (m) {
          if (m[1] == 'parent') {
            if (!newFamilies[m[3]]) {
              newFamilies[m[3]] = { children: [person._id], parents: [m[2]] }
            } else {
              newFamilies[m[3]]['parents'].push(m[2])
            };
          } else if (m[1] == 'spouse') {
            if (!newFamilies[m[3]]) {
              newFamilies[m[3]] = { parents: [person._id, m[2]]}
            } else {
              newFamilies[m[3]]['parents'].push(m[2])
            };
          } else if (m[1] == 'kid') {
            if (!newFamilies[m[3]]) {
              newFamilies[m[3]] = { children: [m[2]], parents: [person._id] }
            } else {
              newFamilies[m[3]]['children'].push(m[2])
            };
          }
        };
      };
      for (family in newFamilies) {
        console.log(newFamilies[family]);
        console.log('--------')
        f = new Family(newFamilies[family]);
        f.save();
        if (family.match(/p/)) {
          person.parents.push(f)
        } else if (family.match(/f/)) {
          person.families.push(f)
        }
      }
      return person.save();
    })
    .then(result => {
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