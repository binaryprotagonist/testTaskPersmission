var UserModel = require("../models/UserModel");
var sha1 = require("sha1");

exports.save = (req, res)=>{
    req.body.password = sha1(req.body.password);
    delete req.body.confirm_password;
    UserModel.save(req.body, function(err, result){
        res.send(result);
    });
}