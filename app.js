var express = require('express')
var expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session')

var passport =require("passport")

var app = express()

require("./confic/passport")(passport)

const mongoose = require('mongoose');
//BODY PERSER
app.use(express.urlencoded({extended:false}))

//cOnnect flash
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
//passport middware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//db connect
const db=require("./confic/keys").mongoURL
mongoose.connect(db, {
  useNewUrlParser: true
}).then(()=>console.log("connectioed"))
.catch(err=>{console.log(err)})
//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Router
app.use("/",require("./routes/index"))
app.use("/users",require("./routes/users"))


// respond with "hello world" when a GET request is made to the homepage
const PORT=process.env.Port||4000

app.listen(PORT,console.log(`port running ${PORT}`))