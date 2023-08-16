const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const usersRouter = require("./Routes/usersRouter");


const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))



// using env variables to save port and connection string

dotenv.config()
const port = process.env.PORT || 8000

// display welcome message on default route
app.get("/", (req, res) =>{
    res.send("Welcome to Tech Talent Quiz")
})

// listening to a port to start express server
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

// // Api endpoint 
app.use("/api/v1/user/", usersRouter)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("database connection successful");
})
.catch((error) =>{
    console.log("database connection failed" + error);
})
