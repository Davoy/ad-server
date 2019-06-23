const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "images": [{"image":String}],
    "title": String,
    "created": {
        "type": Date,
        "default": Date.now
    },
    "tag": String,
    "description": String,
    "author": String,
    "thumbnail": String,
    "content": String,
    "likes": {
        "type": Number,
        "default": 0
    },
    "dislikes": {
        "type": Number,
        "default": 0
    },
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

const model = mongoose.model('Post', schema);

module.exports = model;