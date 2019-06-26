const   router      = require('express').Router(),
        objectid    = require('mongoose').Types.ObjectId,
        blogModel  = require('../../../config/models/post/post.model');

// index 
router.get('', (req, res)=>{
    blogModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve data.'
            });
        }else{
            res.json({
                doc: docs
            });
        }
    });
});

router.get('/:id', (req, res)=>{
    blogModel.find({_id: objectid(req.params.id)}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve data.'
            });
        }else{
            res.json({
                doc: doc
            });
        }
    });
});


module.exports = router;