var routes = require("express").Router();
var UserCtrls = require("../controllers/UserControllers")

routes.get("/", UserCtrls.index);

module.exports = routes;