var jwt = require("jsonwebtoken");

var routes = require("express").Router();

routes.use("/api/signup", require("../routes/signup"));
routes.use("/api/login", require("../routes/login"));
routes.use("/api/users", require("../routes/user"));
routes.use("/api/file", require("../routes/file"));

module.exports = routes;