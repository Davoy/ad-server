const   router          = require('express').Router(),
        objectid        = require('mongoose').objectId,
        serviceModel    = require('../../config/models/service/service.model');

// index 
router.get('', (req, res)=>{
    serviceModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve services.'
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
    let serviceUpdate = [
        {
            title: req.body.title1,
            description: req.body.description1,
            icon: req.body.icon1,
            intro: req.body.intro1,
        },
        {
            title: req.body.title2,
            description: req.body.description2,
            icon: req.body.icon2,
            intro: req.body.intro2,
        },
        {
            title: req.body.title3,
            description: req.body.description3,
            icon: req.body.icon3,
            intro: req.body.intro3,
        },
        {
            title: req.body.title4,
            description: req.body.description4,
            icon: req.body.icon4,
            intro: req.body.intro4,
        },
        {
            title: req.body.title5,
            description: req.body.description5,
            icon: req.body.icon5,
            intro: req.body.intro5,
        },
        {
            title: req.body.title6,
            description: req.body.description6,
            icon: req.body.icon6,
            intro: req.body.intro6,
        }
    ];

    serviceModel.findOneAndUpdate({_id: objectid(req.params.id)}, serviceUpdate, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update services.'
            });
        }else{
            res.json({
                error: false,
                message: 'Services Updated.'
            });
        }
    });
});

module.exports = router;