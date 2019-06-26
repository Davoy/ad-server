const   router        = require('express').Router(),
        projectModel  = require('../../../config/models/project/project.model');

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
                docs: docs
            });
        }
    });
});

module.exports = router;