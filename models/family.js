const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dtfOptions = { dateStyle: 'medium', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
const dtf = new Intl.DateTimeFormat('en-US', dtfOptions);

const familySchema = new Schema({
  startdate: {
    type: Date,
    required: false
  },
  enddate: {
    type: Date,
    required: false
  },
  parents: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: false
  }],
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: false
  }]
});

familySchema.virtual('startdateFormatted').get(function () {
  if (this.startdate) {
    return dtf.format(this.startdate)
  } else {
    return "TBD"
  }
});

familySchema.virtual('enddateFormatted').get(function () {
  if (this.enddate) {
    return dtf.format(this.enddate)
  } else {
    return "TBD"
  }
});

familySchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Family', familySchema);

