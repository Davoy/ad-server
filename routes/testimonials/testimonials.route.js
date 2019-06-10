const router = require('express').Router();

// index 
router.get('', (req, res)=>{});
// new 
router.get('/new', (req, res)=>{});
// create 
router.post('', (req, res)=>{});
// show 
router.get('/:id', (req, res)=>{});
// edit 
router.get('/:id:edit', (req, res)=>{});
// update 
router.put('/:id', (req, res)=>{});
// destroy
router.delete('/:id', (req, res)=>{});

module.exports = router;