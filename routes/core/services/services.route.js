const   router          = require('express').Router(),
        serviceModel    = require('../../../config/models/service/service.model');

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

module.exports = router;