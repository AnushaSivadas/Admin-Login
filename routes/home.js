var express = require('express');
const User = require('../models/user')
var router = express.Router();
const Module = require('../middleware')


router.get('/',Module.requireLogin,async (req,res)=>{
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
    res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
    const user = await User.findOne({_id:req.session.user_id})
    res.render('home',{user})
    
})

module.exports = router;