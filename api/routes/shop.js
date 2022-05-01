const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User } = require("../models/users");
const { first } = require("lodash");

const Users = require('../models/UserModel');
const Shops = require('../models/ShopsModel')
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const { checkAuth } = require("../utils/passport");

router.post('/create_shop', checkAuth, async(req, res) => {
    console.log("made in shop")
    console.log(req.body)
    var newShop = new Shops({
        shop_name: "",
        shop_owner: ""
    })
      
    Shops.findOne({ shop_name : req.body.shop_name}, async(error, user) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        else {
            if(user){
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                console.log(user._id);
                console.log(user.shop_owner);
                res.end("Shop name already exists");
            }
            else{
                newShop.shop_owner = req.user._id.toString();
                newShop.shop_name = req.body.shop_name
                newShop.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
        });
    }
        }
    });
  });

  module.exports = router;