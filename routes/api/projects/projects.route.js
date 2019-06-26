const   router        = require('express').Router(),
        objectid      = require('mongoose').Types.ObjectId,
        projectModel  = require('../../../config/models/project/project.model');
        
// create 
router.post('', (req, res)=>{
    let newProject = new projectModel();
    newProject.images = req.body.images;
    newProject.title = req.body.title;
    newProject.date = new Date(req.body.date);
    newProject.tag = req.body.tag;
    newProject.description = req.body.description;
    newProject.videoLink = req.body.videoLink;

    projectModel.create(newProject, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create project.'
            });
        }else{
            res.json({
                error: false,
                message: 'Project created.'
            });
        }
    });
});

// update 
router.put('/:id', (req, res)=>{
    let projectUpdate = {
        images: req.body.images,
        title: req.body.title,
        date: new Date(req.body.date),
        tag: req.body.tag,
        description: req.body.description,
        videoLink: req.body.videoLink
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