const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "headline": String,
    "typings": [
        {
            "typing": String
        }
    ]
});

const model = mongoose.model('Home', schema);

module.exports = model;