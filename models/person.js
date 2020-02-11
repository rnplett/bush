const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

module.exports = class Person {
  constructor(name, birthdate, imageUrl, description, id) {
    this.name = name;
    this.birthdate = birthdate;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectID(id) : null;
  };

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update the product
      dbOp = db
        .collection('people')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('people').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  static fetchAll() {
    const db = getDb();
    return db
      .collection('people')
      .find()
      .toArray()
      .then(people => {
        console.log(people);
        return people;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(personId) {
    const db = getDb();
    return db
      .collection('people')
      .find({ _id: new mongodb.ObjectId(personId) })
      .next()
      .then(person => {
        return person;
      })
      .catch(err => {
        console.log(err);
    })
  }

  static deleteById(personId) {
    const db = getDb();
    console.log('PersonId:', personId);
    return db
      .collection('people')
      .deleteOne({ _id: new mongodb.ObjectID(personId) })
      .then(result => {
        console.log('Deleted!');
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}