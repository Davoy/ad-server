const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "image": String,
    "title": String,
    "date": Date,
    "tag": String,
    "description": String
});

const model = mongoose.model('Project', schema);

module.exports = model;