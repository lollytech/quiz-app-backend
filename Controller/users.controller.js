/*
step 1 - validate client request body using joi library

*/
const Joi = require("joi")
const Users = require("../model/users")

const bcrypt = require("bcrypt");

const signup = async (req, res)=>{
    const Schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(), 
        password: Joi.string().required()
    });
    //Registering A User
    // Checking if a user with an existing email is already registered
    const { error } = Schema.validate(req.body)
    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    })

    const { 
        firstName, 
        lastName, 
        email,
        password 

     } = req.body
    try {
        let user = await Users.findOne({email});
       
        if (user) return res.status(400).send({
            responseCode: "96",
            responseMessage: "email already exists",
            data: null
        })
        
        user = new Users({
            firstName,
            lastName,
            email,
            password
            // password: Math.floor(Math.random() * 100000) + 1000000
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);


    // saving users to the DB if
        await user.save()
        res.status(201).send({
            responseCode: "00",
            responseMessage: " successful",
            data: user
        })
        // console.log(error);
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error",
            data: null
        })
        console.log(error)
    }
};

module.exports = signup