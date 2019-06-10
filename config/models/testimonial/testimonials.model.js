const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "image": String,
    "name": String,
    "message": String
});

const model = mongoose.model('Testimonial', schema);

module.exports = model;