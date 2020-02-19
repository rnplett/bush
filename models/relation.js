const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const relationSchema = new Schema({
  parents: [{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }],
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }],
  relationType: {
    type: String,
    required: true
  },
  relationStart: {
    type: Date,
    required: false
  },
  relationEnd: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Relation', relationSchema);