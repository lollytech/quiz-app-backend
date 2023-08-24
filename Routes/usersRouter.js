const express = require("express")
const login = require("../Controller/login.controller")
const signup = require("../Controller/users.controller")



const usersRouter = express.Router()


usersRouter.post("/signup", signup)
usersRouter.post("/login", login)


module.exports = usersRouter