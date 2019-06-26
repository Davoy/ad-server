const   router = require('express').Router(),
        testimonialModel = require('../../../config/models/testimonial/testimonials.model');

// index 
router.get('', (req, res)=>{
    testimonialModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve testimonials.'
            });
        }else{
            res.json({
                error: false, 
                docs: docs
            });
        }
    });
});

module.exports = router;