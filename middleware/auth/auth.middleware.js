module.exports = {
    isAuthenticated: (req, res, next)=>{
        if(req.user){
            next();
            return true;
        }else{
            res.redirect('/');
            return false;
        }
    }
}