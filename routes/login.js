var express = require('express');
const User = require('../models/user');
var router = express.Router();
const Module = require('../middleware')

router.get('/',Module.notRequireLogin,Module.notRequireAdminLogin,(req,res)=>{
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
    res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
    res.render('login')
})

router.post('/',async (req,res)=>{
   const {email,password} = req.body;
   const user = await User.findOne({email});
   if(user){
   if(password===user.password){
    req.session.user_id = user._id;
    // req.flash('success','Login Successful!')
    res.redirect('/home')
   }
   else{
    req.flash('error','Incorrect Password!')
    res.redirect('/login')
   }
}
else{
    req.flash('error','Incorrect Email Id!')
    res.redirect('/login') 
}
})


module.exports = router;