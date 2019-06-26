const   router      = require('express').Router(),
        passport    = require('passport'),
        user        = require('../../config/models/user/user.model');

// Login
router.get('/login', passport.authenticate(), (req, res)=>{
    res.json({
        status: 'success',
        session: req.user
    });
});

// Logout
router.get('/logout', (req, res)=>{
    req.logout();
    res.json({
        status: 'success'
    });
});
module.exports = router;