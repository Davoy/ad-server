const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "title": String,
    "description": String,
    "icon": String
});

const model = mongoose.model('Service', schema);

module.exports = model;