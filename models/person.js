const getDb = require('../util/database').getDb;

module.exports = class Person {
  constructor(name, birthdate, imageUrl, description) {
    this.name = name;
    this.birthdate = birthdate;
    this.imageUrl = imageUrl;
    this.description = description;
  };

  save() {
    const db = getDb();
    db.collection('people')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
}