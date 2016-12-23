'use strict';

var mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
	alias_name: String,
	fhem_name: String,
  room: String
});

var model = mongoose.model('Device', deviceSchema);

module.exports = model;
