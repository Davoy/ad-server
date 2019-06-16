const   router      = require('express').Router(),
        objectid    = require('mongoose').Types.ObjectId,
        homeModel  = require('../../config/models/home/home.model');

// index 
router.get('', (req, res)=>{
    homeModel.findOne({}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to get home data.'
            });
        }else{
            res.json({
                doc: doc
            });
        }
    });
});

// update 
router.put('', (req, res)=>{
    let homeUpdate = {
        headline: req.body.headline,
        typings: req.body.typings
    }

    homeModel.findOneAndUpdate({}, homeUpdate, {new: true, upsert: true}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update home data.'
            });
        }else{
            res.json({
                error: false,
                message: 'Home data updated',
                doc: doc
            });
        }
    });
});

module.exports = router;