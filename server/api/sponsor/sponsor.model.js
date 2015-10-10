'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SponsorSchema = new Schema({
  title: String,
  category: { type: Schema.Types.Object, ref: 'Category' },
  sponsor_link: String,
  logo: String,
  imagename: String,
  priority: Number,
  row_layout: Number,
  active: Boolean
  // need uploaded_by?timestamp?
});

module.exports = mongoose.model('Sponsor', SponsorSchema);
