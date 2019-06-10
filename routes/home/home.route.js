const   router      = require('express').Router(),
        objectid    = require('mongoose').objectId,
        homeModel  = require('../../config/models/about/about.model');

// index 
router.get('', (req, res)=>{
    homeModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to get home data.'
            });
        }else{
            res.json({
                data: docs
            });
        }
    });
});

// update 
router.put('/:id', (req, res)=>{
    let homeUpdate = {
        headline: req.body.headline,
        typings: req.body.typings
    }

    homeModle.findOneAndUpdate({_id: objectid(req.params.id)}, homeUpdate, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update home data.'
            });
        }else{
            res.json({
                error: false,
                message: 'Home data updated'
            });
        }
    });
});

module.exports = router;