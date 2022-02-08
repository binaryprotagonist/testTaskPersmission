var database = require("../config/database")

module.exports.save = (obj, cb)=>{
    database(function(err, con){
        if(err){
            console.log("connection error", err);
            return;
        }
        var db = con.db("testTask");
        db.collection("user").insertOne(obj, cb);
    });
}

module.exports.find = (where, cb)=>{
    database(function(err, con){
        if(err){
            console.log("connection error", err);
            return;
        }
        var db = con.db("testTask");
        db.collection("user").find(where).toArray(cb);
    });
}

module.exports.update = (where, obj, cb)=>{
    database(function(err, con){
        if(err){
            console.log("connection error", err);
            return;
        }
        var db = con.db("testTask");
        db.collection("user").update(where, {$set : obj}, cb);
    });
}

module.exports.delete = (where, cb)=>{
    database(function(err, con){
        if(err){
            console.log("connection error", err);
            return;
        }
        var db = con.db("testTask");
        db.collection("user").remove(where, cb);
    })
}