const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "title": String,
    "description": String,
    "icon": String,
    "intro": String
});

const model = mongoose.model('Services', schema);

module.exports = model;