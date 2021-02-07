var express = require('express')
var router =express.Router()
var {ensureAuthenticated}=require("../confic/auth")


router.get('/',  (req, res)=> {
  res.render('welcome')
})

router.get('/dashbord',  ensureAuthenticated,(req, res)=> {
  res.render('dashbord',{
    name:req.user.name
  })
})



module.exports=router