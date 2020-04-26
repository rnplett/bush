const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dtfOptions = { dateStyle: 'medium', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
const dtf = new Intl.DateTimeFormat('en-US', dtfOptions);

const memberSchema = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    required: true
  },
  role: {
    type: String,
    required: false
  },
  joined: {
    type: Date,
    required: false
  },
  left: {
    type: Date,
    required: false
  }
})

memberSchema.virtual('joinedFormatted').get(function () {
  if (this.joined) {
    return dtf.format(this.joined)
  } else {
    return "TBD"
  }
});

memberSchema.virtual('leftFormatted').get(function () {
  if (this.left) {
    return dtf.format(this.left)
  } else {
    return "TBD"
  }
});

module.exports = mongoose.model('Member', memberSchema);

const groupSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  groupType: {
    type: String,
    required: false
  },
  leaders: [{
      type: Schema.Types.ObjectId,
    ref: 'Member',
    required: false
    },
  ],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: false
  }],
  created: {
    type: Date,
    required: false
  },
  ended: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

groupSchema.virtual('createdFormatted').get(function () {
  if (this.created) {
    return dtf.format(this.created)
  } else {
    return "TBD"
  }
});

groupSchema.virtual('endedFormatted').get(function () {
  if (this.ended) {
    return dtf.format(this.ended)
  } else {
    return "TBD"
  }
});

module.exports = mongoose.model('Group', groupSchema);