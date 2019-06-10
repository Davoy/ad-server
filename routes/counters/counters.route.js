const   router        = require('express').Router(),
        objectid      = require('mongoose').objectId,
        counterModel  = require('../../config/models/counters/counters.model');

// index 
router.get('', (req, res)=>{
    counterModel.find({}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve counters'
            });
        }else{
            res.json({
                data: doc
            });
        }
    });
});

// update 
router.put('/:id', (req, res)=>{
    let counterUpdate = [
        {
            icon: req.body.icon1,
            count: req.body.count1,
            title: req.body.title1,
        },
        {
            icon: req.body.icon2,
            count: req.body.count2,
            title: req.body.title2,
        },
        {
            icon: req.body.icon3,
            count: req.body.count3,
            title: req.body.title3,
        },
        {
            icon: req.body.icon4,
            count: req.body.count4,
            title: req.body.title4,
        }
    ];

    counterModel.findOneAndUpdate({_id: objectid(req.params.id)}, {counters: counterUpdate}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update counters.'
            });
        }
        else{
            res.json({
                error: false,
                message: 'Update successful.'
            });
        }
    });
});

module.exports = router;