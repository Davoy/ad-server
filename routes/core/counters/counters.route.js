const   router        = require('express').Router(),
        counterModel  = require('../../../config/models/counters/counters.model');

// index 
router.get('', (req, res)=>{
    counterModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve counters'
            });
        }else{
            res.json({
                docs: docs
            });
        }
    });
});

module.exports = router;