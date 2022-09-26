const requireLogin = (req,res,next)=>{
    if(!req.session.user_id){
       return res.redirect('/login')
    }
    next()
}
const requireAdminLogin = (req,res,next)=>{
    if(!req.session.admin_id){
       return res.redirect('/admin')
    }
    next()
}

const notRequireLogin = (req,res,next)=>{
    if(req.session.user_id){
       return res.redirect('/home')
    }
    next()
}
const notRequireAdminLogin = (req,res,next)=>{
    if(req.session.admin_id){
       return res.redirect('/adminPanel')
    }
    next()
}

module.exports = {
    requireLogin,
   requireAdminLogin,
   notRequireAdminLogin,
   notRequireLogin
};