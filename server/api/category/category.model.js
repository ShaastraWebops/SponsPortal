'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  categoryName: String,
  priorityOrder: Number,
  sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
  createdOn: Date,
  updatedOn: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },	
});

module.exports = mongoose.model('Category', CategorySchema);