// const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User } = require("../models/users");
const { first } = require("lodash");

const Users = require('../models/UserModel');
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const { checkAuth } = require("../utils/passport");

// const app = express();
// const passport = require("passport");
// app.use(passport.initialize());
// app.use(passport.session());



// function validateUser(user) {
//   console.log("made it in validate")
//   const schema = Joi.object({
//   firstName: Joi.string().min(3).required(),
//   lastName: Joi.string().min(3).required(),
//   username: Joi.string().required().email(),
//   password: Joi.string().required(),
//   });
//   return schema.validate(user);

// }

// router.get("/", auth, async(req,res) => {
//     console.log("req.user.email: ", req.user.email);
//     const user = await User.findByEmail(req.user.email);
//     res.send({email: user});
// })

// router.post("/register", async (req, res) => {
//     console.log("req.body: ", _.pick(req.body, ["firstName", "lastName", "email", "password"]));
    
//     const result = User.validate(_.pick(req.body, ["firstName", "lastName", "email", "password"]));
//     if (result.error)
//       return res.status(400).send(result.error.details[0].message);
  
//     let user = await User.findByEmail(req.body.email);
//     // console.log("IF USER EXISTS: ", user, " Leng: ", user.length);
//     console.log(user.email + "THIS LENTH")
//     if (user.email != null) return res.status(400).send("Email already exists");
//     // if (user[0] != "undefined") return res.status(400).send("Email already exists");
  
//     const { firstName, lastName, email, password } = req.body;
  
//     const salt = await bcrypt.genSalt(10);
//     const encPassword = await bcrypt.hash(password, salt);
  
//     user = await User.addNew(firstName, lastName, email, encPassword);

//     console.log("USER: ", user);

//     if(!user){
//         console.log("USER: ", user);
//         return res.status(400).send(user);
//     }
  
//     // const { isadmin } = user;
//     const token = User.generateAuthToken(firstName, lastName, email);
  
//     console.log("Sending response...", token);
//     res
//       .header("x-auth-token", token)
//       .header("access-control-expose-headers", "x-auth-token")
//       .send(_.pick(user, ["firstName", "lastName", "email"]));
//     // res.send("Success");
//   });

router.post('/register', async(req, res) => {
  console.log("made in create")
  console.log(req.body)
  var newUser = new Users({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  Users.findOne({ username : req.body.username }, async(error, user) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      if (user) {
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Username already exists");
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const encPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = encPassword;
        newUser.save((error, data) => {
              if (error) {
                  res.writeHead(500, {
                      'Content-Type': 'text/plain'
                  })
                  res.end(error.message);
              }
              else {
                  res.writeHead(200, {
                      'Content-Type': 'text/plain'
                  })
                  res.end();
              }
          });
      }
  });
});

router.post('/login', async(req, res) => {
  console.log("made in login")
  console.log(req.body)
    
  Users.findOne({ username : req.body.username}, async(error, user) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      if (user) {
          const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if(validPassword){
            const payload = {_id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName};
            const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
          res.status(200).end("JWT " + token);
        }
        else{
          res.status(401).end("Username/Password incorrect combination");
        } 
      }
      else {
        res.status(401).end("No user exists");
      }
  });
});

  router.post("/update_profile", checkAuth, async (req, res) => {
    console.log(req.body);
    console.log(req.user.username)
    var profile = {profile : {month: req.body.month, gender: req.body.gender, city: req.body.city, address: req.body.address, state: req.body.state, country: req.body.country, about: req.body.about}}
    await Users.updateOne({ username : req.user.username}, {firstName: req.body.firstName, lastName: req.body.lastName, profile: profile});
    res.end()
  });
  

module.exports = router;
