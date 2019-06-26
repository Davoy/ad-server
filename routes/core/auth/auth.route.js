const   router      = require('express').Router(),
        passport    = require('passport'),
        user        = require('../../../config/models/user/user.model');

// Login
router.post('/login', passport.authenticate('local'), (req, res)=>{
    res.json({
        status: 'success',
        session: req.user
    });
});

// router.post('/login/create', (req, res)=>{
//     let newUser = new user();
//     newUser.username = req.body.username;
//     user.register(newUser, req.body.password, (error, doc)=>{
//         res.json({
//             message: error ? error:doc
//         });
//     });
// });

// Logout
router.get('/logout', (req, res)=>{
    req.logout();
    res.json({
        status: 'success'
    });
});
module.exports = router;