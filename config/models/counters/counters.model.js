const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    counters:[
        {
            "icon": String,
            "count": Number,
            "title": String
        },
        {
            "icon": String,
            "count": Number,
            "title": String
        },
        {
            "icon": String,
            "count": Number,
            "title": String
        },
        {
            "icon":String,
            "count": Number,
            "title": String
        }
    ]
});

const model = mongoose.model('Counter', schema);

module.exports = model;