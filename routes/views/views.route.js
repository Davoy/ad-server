const router = require('express').Router();

// MAIN
router.get('', (req, res)=>{
    res.render('', {
        page: 'main',
        user: req.user
    });
});

// BLOG
router.get('/blog', (req, res)=>{
    res.render('', {
        page: 'blog',
        user: req.user
    });
});

// DATA INTEGRITY
router.get('/data', (req, res)=>{
    res.render('',{
        page: 'data',
        user: req.user
    });
});

module.exports = router;