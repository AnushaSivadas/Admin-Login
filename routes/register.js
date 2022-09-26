var express = require('express');
const User = require('../models/user');
var router = express.Router();
const Module = require('../middleware')

router.get('/',Module.notRequireLogin,Module.notRequireAdminLogin,(req,res)=>{
    res.render('register')
})

router.post('/',async (req,res)=>{
    const {email,password,username}=req.body;
    const userexist = await User.findOne({email})
    if(userexist){
        req.flash('error','User Already Exists!')
        res.redirect('/register')
    }
    else{
    const user = new User({
        username,
        email,
        password
    })
    await user.save()
    // req.session.user_id = user._id;
    req.flash('success','Registration Successfull!')
    res.redirect('/login')
}
})

module.exports = router;