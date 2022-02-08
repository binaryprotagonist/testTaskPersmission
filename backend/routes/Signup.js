var routes = require("express").Router();
var SignupCtrls = require("../controllers/SignupControllers");

routes.post("/", SignupCtrls.save);

module.exports = routes;