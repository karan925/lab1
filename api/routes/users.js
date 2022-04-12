const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User } = require("../models/users");
const { first } = require("lodash");

router.get("/", auth, async(req,res) => {
    console.log("req.user.email: ", req.user.email);
    const user = await User.findByEmail(req.user.email);
    res.send({email: user});
})

router.post("/register", async (req, res) => {
    console.log("req.body: ", _.pick(req.body, ["firstName", "lastName", "email", "password"]));
    
    const result = User.validate(_.pick(req.body, ["firstName", "lastName", "email", "password"]));
    if (result.error)
      return res.status(400).send(result.error.details[0].message);
  
    let user = await User.findByEmail(req.body.email);
    // console.log("IF USER EXISTS: ", user, " Leng: ", user.length);
    console.log(user.email + "THIS LENTH")
    if (user.email != null) return res.status(400).send("Email already exists");
    // if (user[0] != "undefined") return res.status(400).send("Email already exists");
  
    const { firstName, lastName, email, password } = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(password, salt);
  
    user = await User.addNew(firstName, lastName, email, encPassword);

    console.log("USER: ", user);

    if(!user){
        console.log("USER: ", user);
        return res.status(400).send(user);
    }
  
    // const { isadmin } = user;
    const token = User.generateAuthToken(firstName, lastName, email);
  
    console.log("Sending response...", token);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["firstName", "lastName", "email"]));
    // res.send("Success");
  });

  router.post("/update_profile", async (req, res) => {
      
  })
  

module.exports = router;
