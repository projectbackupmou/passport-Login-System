var express = require('express')
const bcrypt = require('bcryptjs');
var passport =require("passport")
var router =express.Router()


const User = require('../models/User');
//login ppage
router.get('/login',  (req, res)=> {
  res.render('login')
})

//register
router.get('/register',  (req, res) => res.render('register'));

router.post('/register',  (req, res) =>{
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
   if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  }else{
    User.findOne({email:email})
    .then(user=>{
      if(user){
      errors.push({msg:"user already exits"})
 
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  }
  else{

      const newUser = new User({
           name,
           email,
           password
        });
       bcrypt.genSalt(10,  (err, salt)=> {
     bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
             newUser.save() .then(user =>{
                req.flash(
                   'success_msg',
                  'You are now registered and can log in'
               );
                 res.redirect('/users/login')

             })
             .catch(err => console.log(err)); 
     
          })

       })  

  }
})
   
   // res.send("PASS")
    //  const newUser = new User({
    //       name,
    //       email,
    //       password
    //     });
    //     console.log(newUser)
        

        //  bcrypt.genSalt(10,  (err, salt)=> {

        //    bcrypt.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //    newUser.save() .then(user => {
        //         req.flash(
        //           'success_msg',
        //           'You are now registered and can log in'
        //         );
        //         res.redirect('/users/login');
        //       })
        //     .catch(err => console.log(err));
        //   })
        //  })
   

       
  }

});

//login handel
router.post('/login',(req,res,next)=>{
  passport.authenticate('local', { 
    successRedirect: '/dashbord',
   failureRedirect: '/users/login',
  failureFlash: true 
})(req,res,next)
})

//logout handel

router.get   ('/logout',(req,res)=>{
  req.logout();
  req.flash("success_msg","you are log out")
  res.redirect("/users/login")
})


module.exports=router