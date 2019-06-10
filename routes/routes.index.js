const   aboutRoute          = require('./about/about.route'),
        authRoute           = require('./auth/auth.route'),
        blogRoute           = require('./blog/blog.route'),
        countersRoute       = require('./counters/counters.route'),
        homeRoute           = require('./home/home.route'),
        projectsRoute       = require('./projects/projects.route'),
        servicesRoute       = require('./services/services.route'),
        testimonialsRoute   = require('./testimonials/testimonials.route'),
        views               = require('./views/views.route');

module.exports = {
    init: (app) => {
        app.use('', views);
        app.use('/api/auth', authRoute);
        app.use('/api/about', aboutRoute);
        app.use('/api/blog', blogRoute);
        app.use('/api/counters', countersRoute);
        app.use('/api/home', homeRoute);
        app.use('/api/projects', projectsRoute);
        app.use('/api/services', servicesRoute);
        app.use('/api/testimonials', testimonialsRoute);
        app.get('**', (req, res)=>{
            res.redirect('/');
        });
    }
}