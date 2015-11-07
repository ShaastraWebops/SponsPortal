'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var underscore = require('underscore');
var deepPopulate = require('mongoose-deep-populate');
var User = require('../user/user.model');

//Error handling
var validationError = function (res, err) {
  return res.status(422).json(err);
};

function handleError (res, err) {
  return res.status(500).json(err);
};

// Get list of categorys
exports.index = function(req, res) {
  Category.find()
  .populate('sponsors')
  .populate('createdBy', '-salt -hashedPassword -lastSeen -provider')
  .populate('lastEditedBy', '-salt -hashedPassword -lastSeen -provider')
  .exec(function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    return res.json(category);
  })
  .populate('createdBy', '-salt -hashedPassword -lastSeen -provider')
  .populate('lastEditedBy', '-salt -hashedPassword -lastSeen -provider');
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, category) {
  req.body.createdOn = Date.now();
  req.body.updatedOn = Date.now();
  req.body.createdBy = req.user._id;
  req.body.lastUpdatedBy = req.user._id;
    if(err) { return handleError(res, err); }
    return res.status(201).json(category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.updatedOn = Date.now();
  // req.body.lastEditedBy = req.user._id;
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}