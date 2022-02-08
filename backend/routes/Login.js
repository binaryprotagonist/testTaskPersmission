var routes = require("express").Router();
var LoginCtrls = require("../controllers/LoginControllers");

routes.post("/", LoginCtrls.auth);

module.exports = routes;