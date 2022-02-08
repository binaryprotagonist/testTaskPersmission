var FileModel = require("../models/FileModel");
var mongo = require("mongodb");
var path = require("path");
var rand = require("randomstring");
var fs = require("fs");
var multer = require("multer");
var jwt = require("jsonwebtoken");
const arrayBufferToString = require('arraybuffer-to-string')


exports.get =  async (req, res)=>{
    var finalRes=[];
    var check = jwt.verify(req.headers.authorization, "testTask");
    console.log(check);

    FileModel.find({}, async function(err, result){
        for(var i=0; i<result.length; i++){
            var file = result[i];
          if(file.user){
            var checkAccess = file.user.find(element => element == check.id);
            if(checkAccess){
                finalRes.push(file);
            }
          }
        }
        res.send(finalRes)
    })
}

exports.show = (req, res)=>{
    // console.log(req.params.id);
    FileModel.find({_id : mongo.ObjectId(req.params.id)}, function(err, result){
        // console.log(result[0].filename); 
        fs.readFile(path.resolve()+"/assets/files/"+result[0].filename , function read(err, data) {
            if (err) {
                throw err;
            }
            var uint8 = new Uint8Array(data);
            const utf8str = arrayBufferToString(uint8)
            // console.log(arrayBufferToString(utf8str));
            res.send(utf8str);
        });
    })

}

exports.delete = (req, res)=>{
    FileModel.find({_id : mongo.ObjectId(req.params.delete)}, function(err, result){
        // console.log(result[0]);
        var filepath = path.resolve()+"/assets/files/"+result[0].type+"/"+result[0].filename;
        console.log(filepath);
        fs.unlinkSync(filepath);
        FileModel.delete({_id : mongo.ObjectId(req.params.delete)}, function(err, result){
            res.redirect("/")
        })
    })
}

exports.save = (req, res)=>{
    console.log("1", req.body);
    console.log("2",req.file)
    // console.log(file);
    
    if(req.file !== null)
    {
    var name = req.file.originalname;
    var arr = name.split(".");
    var ext = arr[arr.length-1];
    var filename = rand.generate(20)+"."+ext;
    req.body.filename = filename;
    // var usersList = JSON.parse(req.body.users);
    // console.log(usersList);
    var check = jwt.verify(req.headers.authorization, "testTask");

    // console.log("myid", check.id);
    var myId = check.id;
    var userArray = [];
    req.body.users.push(myId);

    console.log(req.body.users);
    // for(var i=0; i<req.body.user.length; i++){
    //     userArray.push(req.body.user[i]);
    // }
    // userArray.push(myId);
    // console.log(userArray);
    // userArray.push(check.id);

    var obj = {
        filename : name,
        user : req.body.users,
        string : filename
    }
    // var users = req.body.users;
    FileModel.save(obj, function(err, result){
        if( result.acknowledged ==  true){
            res.send("file saved");
        }
    })

    }
    

}