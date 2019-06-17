const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "images": String,
    "title": String,
    "date": Date,
    "tag": String,
    "description": String,
    "videoLink": String
});

const model = mongoose.model('Project', schema);

module.exports = model;