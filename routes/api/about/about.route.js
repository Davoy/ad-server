const   router      = require('express').Router(),
        objectid    = require('mongoose').Types.ObjectId;
        aboutModel  = require('../../../config/models/about/about.model'),
        fs          = require('fs');

// update 
router.put('', (req, res)=>{
    let aboutUpdate = {};
    if(req.query.field){
        if(req.query.field == 'socials'){
            aboutUpdate = {
                $push: 
                {
                    socials: {
                        url: req.body.field1,
                        icon: req.body.field2
                    }
                }
            }
        }else{
            aboutUpdate = {
                $push: 
                {
                    skills: {
                        title: req.body.field1,
                        year: req.body.field2
                    }
                }
            }
        }
    }else{
        aboutUpdate = {
            image: req.body.image,
            name: req.body.name,
            profession: req.body.profession,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            about: req.body.about
        }
    }
    
    aboutModel.findOneAndUpdate({}, aboutUpdate, {new: true, upsert:true}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update section.',
                doc: doc
            });
        }else{
            res.json({
                error: false,
                doc: doc
            });
        }
    });
});

router.put('/update', (req, res)=>{
    
    if(req.query.field == 'socials'){
        let update = {
            $set: {
                "socials.$.url": req.body.field1,
                "socials.$.icon":req.body.field2
            }
        };
        aboutModel.findOneAndUpdate({"socials._id": objectid(req.body.id)}, update, {new: true}, (error, doc)=>{
            if(error){
                console.log(error);
                res.json({
                    error: true,
                    message: 'Unable to update socials.',
                    doc: doc
                });
            }else{
                res.json({
                    error: false,
                    doc: doc
                });
            }
        });
    }else{
        let update = {
            $set: {
                "skills.$.title": req.body.field1,
                "skills.$.year":req.body.field2
            }
        };
        aboutModel.findOneAndUpdate({"skills._id": objectid(req.body.id)}, update, {new: true}, (error, doc)=>{
            if(error){
                console.log(error);
                res.json({
                    error: true,
                    message: 'Unable to update skills.',
                    doc: doc
                });
            }else{
                res.json({
                    error: false,
                    doc: doc
                });
            }
        });
    }
});

router.delete('/delete', (req, res)=>{
    let $pull = {};
    $pull[req.query.field] = {
        _id: objectid(req.body.id)
    };
    let query = {
        $pull
    };
    aboutModel.findOneAndUpdate({}, query, {new: true}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to delete '+req.query.field,
                doc: doc
            });
        }else{
            res.json({
                error: false,
                doc: doc
            });
        }
    });
});

module.exports = router;