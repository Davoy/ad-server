const   router      = require('express').Router(),
        homeModel  = require('../../../config/models/home/home.model');

// index 
router.get('', (req, res)=>{
    homeModel.findOne({}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to get home data.'
            });
        }else{
            res.json({
                doc: doc
            });
        }
    });
});

module.exports = router;