var express = require('express');
const Admin = require('../models/admin');
var router = express.Router();
const Module = require('../middleware')

router.get('/',Module.notRequireAdminLogin,Module.notRequireLogin, (req,res)=>{
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
    res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
    res.render('admin')
    
})

router.post('/',async (req,res)=>{
   const {email,password} = req.body;
   const admin = await Admin.findOne({email});
   if(admin){
   if(password===admin.password){
    req.session.admin_id = admin._id;
    res.redirect('/adminPanel')
   }
   else{
    req.flash('error','Incorrect Password!')
    res.redirect('/admin')
   }
}
else{
    req.flash('error','Incorrect Email Id!')
    res.redirect('/admin')
}
})

router.get('/adminlogout',(req,res)=>{
    req.session.admin_id=null;
    //req.session.destroy(); 
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
     res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
     res.redirect('/admin') 
    })




module.exports = router;