const   router      = require('express').Router(),
        objectid    = require('mongoose').Types.ObjectId,
        blogModel  = require('../../config/models/post/post.model');

// index 
router.get('', (req, res)=>{
    blogModel.find({}, (error, docs)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to retrieve data.'
            });
        }else{
            res.json({
                data: docs
            });
        }
    });
});

router.post('', (req, res)=>{
    let newPost = new blogModel();
    newPost.image = req.body.image;
    newPost.title = req.body.title;
    newPost.tag = req.body.tag;
    newPost.description = req.body.description;
    newPost.author = req.user.name;
    newPost.thumbnail = req.body.thumbnail;
    newPost.content = req.body.content;
    newPost.comments = [];
    
    blodModel.create(newPost, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create post.'
            });
        }else{
            res.json({
                error: false,
                message: 'Created post - ' + newPost.title
            });
        }
    });
});

router.post('/:id/like', (req,res)=>{
    blogModel.findOneAndUpdate({_id: objectid(req.params.id)}, {$inc: {likes:1}}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to increment likes.'
            })
        }
    });
});

router.post('/:id/dislike', (req,res)=>{
    blogModel.findOneAndUpdate({_id: objectid(req.params.id)}, {$inc: {dislikes:1}}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to increment dislikes.'
            })
        }
    });
});

router.post('/:id/comment', (req,res)=>{
    let comment = {
        author: req.body.author,
        content: req.body.content,
        avatar: null,
        comments: [],
    }
    blogModel.findByIdAndUpdate({_id: objectid(req.params.id)}, {$push: { comments: comment }} , {new: true}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create new comment'
            });
        }else{
            res.json({
                error: false,
                doc: doc
            });
        }
    });
});

router.post('/:id/comment/:commentID', (req,res)=>{
    let comment = {
        author: req.body.author,
        content: req.body.content,
        avatar: null
    }
    blogModel.findByIdAndUpdate({"comments._id": objectid(req.params.commentID)}, {$push: { comments: comment }} , {new: true}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to create new sub comment'
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
    var blogUpdate = {
        image: req.body.image,
        title: req.body.title,
        tag: req.body.tag,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        content: req.body.content,
    }

    blogModel.findOneAndUpdate({_id: objectid(req.params.id)}, blogUpdate, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to update section.'
            });
        }
    });
});

router.delete('/:id', (req, res)=>{
    blogModel.findOneAndDelete({_id: objectid(req.params.id)}, (error, doc)=>{
        if(error){
            console.log(error);
            res.json({
                error: true,
                message: 'Unable to delete post'
            });
        }else{
            res.json({
                error: false,
                message: 'Post - ' + doc.title +' - has been removed.'
            });
        }
    });
});

module.exports = router;