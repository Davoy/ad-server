const   router        = require('express').Router(),
        objectid      = require('mongoose').Types.ObjectId,
        counterModel  = require('../../../config/models/counters/counters.model');

router.post('', (req, res)=>{
    let newCounter = new counterModel();
    newCounter.icon = req.body.icon;
    newCounter.count = req.body.count;
    newCounter.title = req.body.title;

    counterModel.create(newCounter, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create new counter'
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
    let counterUpdate = {
        icon: req.body.icon,
        count: req.body.count,
        title: req.body.title
    };

    counterModel.findOneAndUpdate({_id: objectid(req.params.id)}, counterUpdate, (error, doc)=>{
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
                message: 'Update successful.',
                doc: doc
            });
        }
    });
});

router.delete('/:id', (req, res)=>{
    counterModel.findOneAndDelete({_id: objectid(req.params.id)}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to delete counter'
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