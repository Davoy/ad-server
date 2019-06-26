const   aboutRouteCore          = require('./core/about/about.route'),
        aboutRouteAPI           = require('./api/about/about.route'),
        authRouteCore           = require('./core/auth/auth.route'),
        blogRouteCore           = require('./core/blog/blog.route'),
        blogRouteAPI            = require('./api/blog/blog.route'),
        countersRouteCore       = require('./core/counters/counters.route'),
        countersRouteAPI        = require('./api/counters/counters.route'),
        homeRouteCore           = require('./core/home/home.route'),
        homeRouteAPI            = require('./api/home/home.route'),
        projectsRouteCore       = require('./core/projects/projects.route'),
        projectsRouteAPI        = require('./api/projects/projects.route'),
        servicesRouteCore       = require('./core/services/services.route'),
        servicesRouteAPI        = require('./api/services/services.route'),
        testimonialsRouteCore   = require('./core/testimonials/testimonials.route'),
        testimonialsRouteAPI    = require('./api/testimonials/testimonials.route'),
        views                   = require('./views/views.route'),
        authMw                  = require('../middleware/auth/auth.middleware');

module.exports = {
    init: (app) => {
        app.use('', views);
        app.use('/auth', authRouteCore);
        app.use('/about', aboutRouteCore);
        app.use('/blog', blogRouteCore);
        app.use('/counters', countersRouteCore);
        app.use('/home', homeRouteCore);
        app.use('/projects', projectsRouteCore);
        app.use('/services', servicesRouteCore);
        app.use('/testimonials', testimonialsRouteCore);
        // API ROUTES
        app.use('/api/about', authMw.isAuthenticated, aboutRouteAPI);
        app.use('/api/blog', authMw.isAuthenticated, blogRouteAPI);
        app.use('/api/counters', authMw.isAuthenticated, countersRouteAPI);
        app.use('/api/home', authMw.isAuthenticated, homeRouteAPI);
        app.use('/api/projects', authMw.isAuthenticated, projectsRouteAPI);
        app.use('/api/services', authMw.isAuthenticated, servicesRouteAPI);
        app.use('/api/testimonials', authMw.isAuthenticated, testimonialsRouteAPI);
        app.get('**', (req, res)=>{
            res.redirect('/');
        });
    }
}