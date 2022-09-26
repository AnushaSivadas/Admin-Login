const express = require('express');
const mongoose  = require('mongoose');
const path = require('path')
// const hbs=require('express-handlebars')
const app = express();
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register')
const homeRouter = require('./routes/home')
const adminRouter = require('./routes/admin')
const adminPanelRouter = require('./routes/adminPanel');
mongoose.connect('mongodb://localhost:27017/Week_6');

app.set('view engine', 'ejs');
// app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:false,partialDir:__dirname+'/views/partials/'}))
app.set("views", path.join(__dirname,'views'));

app.get('/secret',(req,res)=>{
    res.send('This is secret!')
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'key123'
}))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next()
})

app.use('/',indexRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.use('/home',homeRouter)
app.use('/admin',adminRouter)
app.use('/adminPanel',adminPanelRouter)


app.listen(3000,()=>{
    console.log("SERVING YOUR APP!")
})

