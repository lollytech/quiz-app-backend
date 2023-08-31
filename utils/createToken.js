const request  = require("express");
const jwt = require("jsonwebtoken")
const auth = (request,res,next)=>{
    if (!req.header("Authorization")) {
        return res.status(401).send({
          responseCode: "80",
          responseMessage: "Unauthorized",
          data: null,
        });
      }
      const token = request.header("Authorization")?.replaceAll("Bearer ", "");
      if (!token) {
        return res.status(401).send({
          responseCode: "81",
          responseMessage: "Invalid token",
          data: null,
        });
      }
      try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        request.user = payload;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          res.status(401).send({
            responseCode: "96",
            responseMessage: "Token expired",
            data: null,
          });
        }
        res.status(401).send({
          responseCode: "95",
          responseMessage: "Token provided is invalid",
          data: null,
        });
      }
    };
    module.exports = auth;