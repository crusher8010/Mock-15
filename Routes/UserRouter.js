const express = require("express");

const { Register, Login } = require("../controller/userController");

const Router = express.Router();

Router.route("/register").post(Register);
Router.route("/login").post(Login);

module.exports = Router;