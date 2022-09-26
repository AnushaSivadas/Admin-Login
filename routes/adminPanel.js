var express = require('express');
const User = require('../models/user')
var router = express.Router();
const Module = require('../middleware')

router.get('/',Module.requireAdminLogin, async(req,res)=>{
    
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
    res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
    const {username} = req.query
    if(username){
        const user= await User.find({username})
    res.render('adminPanel',{user,username:true})
    }
    else{
        const user= await User.find({})
    res.render('adminPanel',{user,username:false})
    }
    
    
})


module.exports = router;