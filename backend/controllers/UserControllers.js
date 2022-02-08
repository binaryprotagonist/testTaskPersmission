var jwt = require("jsonwebtoken");
var UserModel = require("../models/UserModel")
var mongo = require("mongodb");

exports.index = (req, res)=>{
    // UserModel.find({}, function(err, result){
        var token = req.headers.authorization;
        console.log(token);
        var info = jwt.verify(token, "testTask")
        // console.log("info", info);
        UserModel.find({}, function(err, result){
            // console.log(result)
            res.status(200).json(result);
        })
}