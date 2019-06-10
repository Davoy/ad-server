const router = require('express').Router();

// MAIN
router.get('', (req, res)=>{
    let home = {
        headline: 'I am Alexandra Dilley',
        typings: ["CEO DevFolio","Web Developer","Web Designer","Frontend Developer","Graphic Designer"].toString()
    }

    let about = {};
    let services = {};
    let counters = {};
    let projects = {};
    let testimonials = {};
    let blogs = {};

    res.render('', 
        {
            page: 'main',
            user: req.user,
            home: home,
            about: about,
            services: services,
            counters: counters,
            projects: projects,
            testimonials: testimonials,
            blogs: blogs
        }
    );
});

// BLOG
router.get('/blog', (req, res)=>{
    res.render('', {page: 'blog'});
});
// DATA INTEGRITY
router.get('/data', (req, res)=>{
    res.render('', {page: 'data'});
});

module.exports = router;