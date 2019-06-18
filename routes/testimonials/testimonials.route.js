const   router = require('express').Router(),
        objectid = require('mongoose').Types.ObjectId;
        testimonialModel = require('../../config/models/testimonial/testimonials.model');

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
// create 
router.post('', (req, res)=>{
    let newTestimonial = new testimonialModel();
    newTestimonial.image = req.body.image;
    newTestimonial.name = req.body.name;
    newTestimonial.message = req.body.message;

    testimonialModel.create(newTestimonial, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create new testimonial.'
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
    let updateTestimonial = {
        image: req.body.image,
        name: req.body.name,
        message: req.body.message
    };
    testimonialModel.findOneAndUpdate({_id: objectid(req.params.id)}, updateTestimonial, {new:true}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update testimonial'
            });
        }else{
            res.json({
                error: false,
                doc: doc
            });
        }
    });
});
// destroy
router.delete('/:id', (req, res)=>{
    testimonialModel.findOneAndDelete({_id: objectid(req.params.id)}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to delete testimonial'
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