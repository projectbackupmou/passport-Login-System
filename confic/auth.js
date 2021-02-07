module.exports={
 ensureAuthenticated:function(req,res,next){
     if(req.isAuthenticated()){
         return next()
     }
     req.flash("error_msg","log in");
     req.redirect("/users/login")
 }
}