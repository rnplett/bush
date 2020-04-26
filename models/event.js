const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dtfOptions = { dateStyle: 'medium', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
const dtf = new Intl.DateTimeFormat('en-US', dtfOptions);

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: false
  },
  eventdate: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: false
  },
});

personSchema.virtual('eventdateFormatted').get(function () {
  if (this.eventdate) {
    return dtf.format(this.eventdate)    
  } else {
    return "TBD"
  }

});

module.exports = mongoose.model('Event', eventSchema);
