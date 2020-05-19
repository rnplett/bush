const mongoose = require('mongoose');
const family = require('./family');

const Schema = mongoose.Schema;

const dtfOptions = { dateStyle: 'medium', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
const dtf = new Intl.DateTimeFormat('en-US', dtfOptions);

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: false
  },
  deathdate: {
    type: Date,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  parents: [{
    type: Schema.Types.ObjectId,
    ref: 'Family',
    required: false
  }],
  families: [{
    type: Schema.Types.ObjectId,
    ref: 'Family',
    required: false
  }] 
});

personSchema.virtual('birthdateFormatted').get(function () {
  if (this.birthdate) {
    return dtf.format(this.birthdate)    
  } else {
    return "TBD"
  }
});

personSchema.virtual('deathdateFormatted').get(function () {
  if (this.deathdate) {
    return dtf.format(this.deathdate)
  } else {
    return "TBD"
  }
});

personSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Person', personSchema);
