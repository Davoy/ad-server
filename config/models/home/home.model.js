const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "headline": String,
    "typings": Array
});

const model = mongoose.model('Home', schema);

module.exports = model;