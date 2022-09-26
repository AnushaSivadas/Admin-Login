var express = require('express');
const User = require('../models/user')
var router = express.Router();
const Module = require('../middleware')

router.get('/',(req,res)=>{
    res.redirect('/login')
})
router.get('/userLogout',(req,res)=>{
    req.session.user_id=null;
    // req.session.destroy(); 
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
     res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
    req.flash('success','Logout Successfull!')
     res.redirect('/login') 
    })

router.get('/adminLogout',(req,res)=>{
    req.session.admin_id=null;
//req.session.destroy(); 
res.header('cache-control', 'private,no-cache,no-store,must revalidate')
 res.header('Express', '-1')
res.header('paragrm', 'no-cache')
req.flash('success','Logout Successfull!')
 res.redirect('/admin') 

})

router.get('/createUser',Module.requireAdminLogin, async(req,res)=>{
    if(!req.session.admin_id){
        res.redirect('/login')
    }
    else{
    res.render('createUser')
    }
})

router.post('/createUser',async (req,res)=>{
    const {email,password,username}=req.body;
    const userexist = await User.findOne({email})
    if(userexist){
        req.flash('error','User Already Exists!')
        res.redirect('/createUser')
    }
    else{
    const user = new User({
        username,
        email,
        password
    })
    await user.save()
    req.flash('success','User Creation Successfull!')
    res.redirect('/adminPanel')
}
})

router.get('/editUser/:id',Module.requireAdminLogin, async (req,res)=>{
    const {id}=req.params;
    const user = await User.findById(id)
    res.render('editUser',{user})
})

router.put('/editUser/:id',async (req,res)=>{
    const {id}=req.params;
    const user = await User.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    req.flash('success','Updation Successfull!')
    res.redirect('/adminPanel')
})
router.delete('/deleteUser/:id',async(req,res)=>{
    const {id}=req.params;
    const user = await User.findByIdAndDelete(id)
    req.flash('success','Deletion Successfull!')
    res.redirect('/adminPanel')
})

module.exports = router;