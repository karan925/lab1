const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { User } = require("../models/users");

// router.post("/", async (req, res) => {
//   const result = validate(req.body);
//   if (result.error)
//     return res.status(400).send(result.error.details[0].message);

//     console.log(result);

//   let user = await User.findByEmail(req.body.email);
//   if (!user) return res.status(400).send("Invalid email");

//   console.log(user + "this is user");
//   console.log(user.password + " pass");
//   console.log(req.body.password + " pas2s");

//   const validPassword = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );
//   console.log(validPassword);
//   if (!validPassword) return res.status(400).send("Invalid  password");
  
//   const {firstName, lastName, email} = user;
//   console.log(firstName, lastName, email)

//   const token = User.generateAuthToken(firstName, lastName, email);

//   res.send(token);
// });

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
