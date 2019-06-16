const   router          = require('express').Router(),
        objectid        = require('mongoose').Types.ObjectId,
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
                docs: docs
            });
        }
    });
});

router.post('/create', (req, res)=>{
    let newService = new serviceModel();
    newService.title = req.body.title;
    newService.description = req.body.description;
    newService.icon = req.body.icon;

    serviceModel.create(newService, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create new service'
            });
        }else{
            res.json({
                error: false,
                doc: doc
            });
        }
    });
});

// update 
router.put('/:id', (req, res)=>{
    console.log(req.body);
    let serviceUpdate = {
        title: req.body.title,
        description: req.body.description,
        icon: req.body.icon
    }

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
                message: 'Services Updated.',
                doc: doc
            });
        }
    });
});

router.delete('/:id', (req, res)=>{
    serviceModel.findOneAndDelete({_id: objectid(req.params.id)}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to remove service'
            });
        }else{
            res.json({
                error: false,
                message: 'Service removed',
                doc: doc
            });
        }
    });
});

module.exports = router;