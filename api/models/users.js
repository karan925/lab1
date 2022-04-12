const http = require("../services/httpService");
const config = require("../config/default.json");
const dbURL = "https://cmpe-lab1-273.herokuapp.com";
const dbURL1 = "https://us-cdbr-east-05.cleardb.net";
const mysql = require("mysql");

const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { Prohairesis } = require('prohairesis');
const { first, last } = require("lodash");

const database = new Prohairesis("mysql://b16d75e015fe82:4bd269ff@us-cdbr-east-05.cleardb.net/heroku_719defa3128be15?reconnect=true");

class User {
    static async findByEmail(email) {
    //   const { data: user } = await http.get(dbURL1 + "/search?", {
    //     params: {
    //       email: email,
    //     },
    //   });
    let email1;
    let pass;
    let firstName;
    let lastName;

    await database.query(
        'SELECT * FROM login_table WHERE email = @email', 
        {email: email}).then((res) => {
        console.log("THIS IS THE RES FROM QUERY" + JSON.stringify(res));
        if(res.length === 0){
            email1 = [null];
            pass = [null];
            firstName = [null];
            lastName = [null];
        }
        else{
        email1 = res.map(user => user.email);
        pass = res.map(user => user.password);
        firstName = res.map(user => user.firstName);
        lastName = res.map(user => user.lastName);
        console.log(email1[0])
        console.log(pass[0])
        }

    }).catch((err) => {
        console.log("THIS IS THE EROR IN FIND BY EMAIL" + err);
        return err;
    })

    return {email: email1[0], password: pass[0], firstName: firstName[0], lastName: lastName[0]};

    };

    static async addNew(firstName, lastName, email, password) {
        // const { data: user } = await http.post(dbURL + "/add", {
        //   name: name,
        //   email: email,
        //   userpassword: password,
        // });
        let flag = 0;

        await database.execute('INSERT INTO login_table (firstName, lastName, email, password) VALUES (@firstName, @lastName, @email, @password)', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password:password
        }).then((res) => {
            console.log(res);
            console.log("Printing res")
            flag = 1;
        }).catch((err)=> {
            console.log(err + "THIS IS ERROR");
            return err;
        })
        
        if(flag){
            return({firstName: firstName, lastName, email});
        }
        else{
            return err;
        }
      }

      static generateAuthToken(firstName, lastName, email) {
        const token = jwt.sign(
          {
            firstName: firstName,
            lastName: lastName,
            email: email
          },
          config.jwtPrivateKey
        );
        return token;
      }

    static validate(user) {
        const schema = Joi.object({
          firstName: Joi.string().min(3).required(),
          lastName: Joi.string().min(3).required(),
          email: Joi.string().required().email(),
          password: Joi.string().required(),
        });
        return schema.validate(user);
      }
    
}

module.exports.User = User;