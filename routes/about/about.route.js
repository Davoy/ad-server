const   router      = require('express').Router(),
        objectid    = require('mongoose').Types.ObjectId,
        aboutModel  = require('../../config/models/about/about.model');

// index 
router.get('', (req, res)=>{
    aboutModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve data.'
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
    var aboutUpdate = {
        image: req.body.image,
        name: req.body.name,
        profession: req.body.profession,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        socials: req.body.socials,
        about: req.body.about
    }

    aboutModel.findOneAndUpdate({_id: objectid(req.params.id)}, aboutUpdate, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update section.'
            });
        }
    });
});

module.exports = router;