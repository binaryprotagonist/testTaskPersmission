var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var routes = require("./config/routes");
var cors = require("cors");
var multer = require("multer");


app.use(express.static(__dirname+"/assets"));

app.use(cors());
// app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(multer());


// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', "*");

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


app.use(routes);

app.listen(3001, ()=>{
    console.log("server running")
})