const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "image": String,
    "name": String,
    "profession": String,
    "email": String,
    "phone": String,
    "location": String,
    "socials":[
        {
            "url": String,
            "icon": String
        }
    ],
    "about": String
});

const model = mongoose.model('About', schema);

module.exports = model;