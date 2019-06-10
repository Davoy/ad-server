const   router      = require('express').Router(),
        passport    = require('passport');

// Login
router.get('/login', passport.authenticate(), (req, res)=>{
    res.json({
        status: 'success'
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