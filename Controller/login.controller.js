const joi = require("joi");
const Users = require("../model/users");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");


const login = async(req, res) => {
    const schema = joi.object({
        email: joi.string().email().required().min(3),
        password: joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body);

    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    });
try {
    let user = await Users.findOne({email: req.body.email})
    if(!user)return res.status(400).send({
        responseCode: "96",
        responseMessage: "Invalid email or password",
        data: null
    });

const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword)
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "Invalid email or password",
        data: null,
      });
   
      res.status(200).send({
        responseCode: "00",
        responseMessage: "Login successful",
        data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
        const token = createToken(user);

        res.status(200).send({
        responseCode: "00",
        responseMessage: "Login successful",
        data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
      }
    })
        
} catch (error) {
    res.status(500).send({
        responseCode: "95",
        responseMessage:"internal server error",
        data: null
    })
    console.log(error)
}

}

module.exports = login