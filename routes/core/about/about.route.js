const   router      = require('express').Router(),
        aboutModel  = require('../../../config/models/about/about.model');

// index 
router.get('', (req, res)=>{
    aboutModel.findOne({}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve data.'
            });
        }else{
            res.json({
                doc: doc
            });
        }
    });
});

module.exports = router;