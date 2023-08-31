const express = require("express")
const login = require("../Controller/login.controller")
const signup = require("../Controller/users.controller")
const forgotPassword = require("../Controller/forgetPassword")
const resetPassword = require("../Controller/resetPassword")



const usersRouter = express.Router()


usersRouter.post("/signup", signup)
usersRouter.get("/login", login)
usersRouter.post("/forgetPassword", forgotPassword)
usersRouter.post("/resetPassword", resetPassword)


module.exports = usersRouter