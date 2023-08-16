const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: "First name is required"
    },
    lastName: {
        type: String,
        minlength: 3,
        required: "Last name is required"
    },
    email: {
        type: String,
        unique: true,
        required : "Email is required"
    },
    password: {
        type: String,
        required: "password is required"
    },
    
    dateCreated: {
        type: String,
        default: new Date().toJSON()
    },
    dateUpdated: {
        type: String,
    },
});



const Users = mongoose.model("users", usersSchema)

module.exports =  Users