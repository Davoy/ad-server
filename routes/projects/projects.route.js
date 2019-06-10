const   router        = require('express').Router(),
        objectid      = require('mongoose').Types.ObjectId,
        projectModel  = require('../../config/models/project/project.model');

// index 
router.get('', (req, res)=>{
    projectModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve project.'
            });
        }else{
            res.json({
                data: docs
            });
        }
    });
});

// create 
router.post('', (req, res)=>{
    let newProject = new projectModel();
    newProject.image = req.body.image;
    newProject.title = req.body.title;
    newProject.date = req.body.date;
    newProject.tag = req.body.tag;
    newProject.description = req.body.description;

    projectModel.create(newProject, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create project.'
            });
        }else{
            releaseEvents.json({
                error: false,
                message: 'Project created.'
            });
        }
    });
});

// update 
router.put('/:id', (req, res)=>{
    let projectUpdate = {
        image: req.body.image,
        title: req.body.title,
        date: req.body.date,
        tag: req.body.tag,
        description: req.body.description
    }

    projectModel.findOneAndUpdate({_id: objectid(req.params.id)}, projectUpdate,(error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update project.'
            });
        }else{
            res.json({
                error: false,
                message: 'Project Updated.'
            });
        }
    });
});

// destroy
router.delete('/:id', (req, res)=>{
    projectModel.findOneAndDelete({_id: objectid(req.params.id)}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to remove project.'
            });
        }else{
            res.json({
                error: false,
                message: 'Project Removed.'
            });
        }
    });
});

module.exports = router;