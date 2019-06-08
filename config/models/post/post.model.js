const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "image": String,
    "title": String,
    "created": {
        "type": Date,
        "default": Date.now
    },
    "tags": [
        {
            "tag": String
        }
    ],
    "description": String,
    "author": String,
    "thumbnail": String,
    "content": String,
    "likes": Number,
    "dislikes": Number,
    comments: [
        {
            "author": String,
            "content": String,
            "created": {
                "type": Date,
                "default": Date.now
            },
            "avatar": String,
            comments: [
                {
                    "author": String,
                    "content": String,
                    "created": {
                        "type": Date,
                        "default": Date.now
                    },
                    "avatar": String
                }
            ]
        }
    ]
});

const model = mongoose.model('Project', schema);

module.exports = model;