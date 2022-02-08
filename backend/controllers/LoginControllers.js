var UserModel = require("../models/UserModel");
var sha1 = require("sha1");
var jwt = require("jsonwebtoken");

module.exports.auth = (req, res)=>{
    var obj = req.body;
    UserModel.find({ email : obj.email}, function(err, result){
        if(result.length == 1)
        {
            if(result[0].password == sha1(obj.password))
            {
                var token = jwt.sign({id : result[0]._id, username : result[0].username}, "testTask")
                res.status(200).json(token)
            }
            else{
                res.status(401).json({ type : 2})
            }
        }
        else
        {
            res.status(401).json({ type : 1})
        }
        // console.log(result);
        // res.send(result);
    })
}