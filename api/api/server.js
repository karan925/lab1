const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const { Http2ServerResponse } = require("http2");
const multer = require('multer');

const { createTokens, validateToken } = require("./jwttoken");

var cookieParser = require('cookie-parser')

app.use(cookieParser())

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./");},
  filename: function(req, file, cb){
    const ext = file.mimetype.split("/")[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  }
});

const upload = multer({
  storage: storage
});

const { sign, verify } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
const { nextTick } = require("process");

app.use(cors());
app.options('*', cors());

// app.use(cors({origin: 'http://cmpe-lab1-273.herokuapp.com'}));


app.use(express.json());
const session = require('express-session');
app.use(
  session({
      resave: false,
      saveUninitialized: true,
      secret: "jwtSecret",
    })
  );


//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  app.get('*', function(req, res){
    const index = path.join(__dirname, 'client', 'build', 'index.html');
    res.sendFile(index);
  })
}

const pool = mysql.createPool({
  connectionLimit : 10,
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b16d75e015fe82',
  password: '4bd269ff',
  database: 'heroku_719defa3128be15'
});

app.post('/register', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  console.log(email, password, firstName, lastName);

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query("INSERT INTO login_table (email, password, firstName, lastName) VALUES (?,?,?,?)", [email, password, firstName, lastName], function (error, results, fields) {
      // When done with the connection, release it.
      connection.release()
  
      // Handle error after the release.
      if (error){
        res.status(400).json({ error: error.message });
      }else{
      res.status(200).json("Success");
      res.end();
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});


app.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query("SELECT * FROM login_table WHERE email = ? AND password = ?", [email, password], function (error, results, fields) {
      // When done with the connection, release it.
      connection.release()
  
      // Handle error after the release.
      if (error){
        console.log(error)
      }else if(results.length > 0){

        console.log(results[0].id + " ID");
        const accessToken = createTokens(results[0].id);

        console.log("Access token " + accessToken);

        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });
        req.session.user = results;
        console.log(req.session.user);
        res.json({auth: true, token: accessToken, result: results});
      } else{
        // res.status(400).json({ error: "Incorrect email/password combination" });
        res.status(400).json({auth: false, message: "No user exists"});
        res.end();
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

const verifyJWT = (req, res) => {
  const token = req.headers["x-access-token"];

  if(!token){
    res.send("Need token");
  } else{
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if(err){
        res.json({auth: false, message: "failed to authenticate"});
      }else{
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Authenticated");
})

app.post('/update_profile', validateToken, (req, res) => {

  const gender = req.body.gender;
  const date_of_birth = req.body.date_of_birth;
  const city = req.body.city;
  const about = req.body.about
  const address = req.body.address;
  const state = req.body.state;
  const country = req.body.country;
  // const id = 264;

  // console.log(JSON.stringify(req.header))
  // const token = req.header["x-access-token"];

  const token = req.cookies["access-token"];

  console.log(token + "THIS TOKEN")

  // const decoded = jwt.verify(token, "jwtSecret");  
  const validToken = verify(token, "jwtSecret");
  console.log(validToken);
  var userId = validToken.user
  console.log(userId)  

  console.log(req.authenticated);  



  console.log(gender, date_of_birth, city, about, address, state, country, userId);

  // res.send("success");

  pool.getConnection(function(err, connection) {
    
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query("REPLACE INTO profile (gender, date_of_birth, city, about, address, state, country, users_id) VALUES (?,?,?,?,?,?,?,?)", [gender, date_of_birth, city, about, address, state, country, userId], function (error, results, fields) {
      // When done with the connection, release it.
      connection.release()
  
      // Handle error after the release.
      if (error){
        res.status(400).json({ error: error.message });
      }else{
        
      // res.cookie("access-token", accessToken, {
      //     maxAge: 60 * 60 * 24 * 30 * 1000,
      //     httpOnly: true,
      //   });
      res.status(200).json("Success");
      res.end();
      // res.cookie("access-token", accessToken, {
      //   maxAge: 60 * 60 * 24 * 30 * 1000,
      //   httpOnly: true,
      // });
      // res.end()
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

app.put('/update_login', validateToken, (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // const id = 264;

  // const token = req.headers["x-access-token"];
  const token = req.cookies["access-token"];

  console.log(token + "THIS TOKEN")

  const validToken = verify(token, "jwtSecret");
  console.log(validToken);
  var userId = validToken.user
  console.log(userId)  

  console.log(req.authenticated);  


  // const decoded = jwt.verify(token, "jwtSecret");  
  // var userId = decoded.id  
  // console.log(userId + " ID")

  console.log(firstName, lastName, userId);

  // res.send("success");

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query("UPDATE login_table set firstName = ?, lastName = ? WHERE id = ?", [firstName, lastName, userId], function (error, results, fields) {
      // When done with the connection, release it.
      connection.release()
  
      // Handle error after the release.
      if (error){
        res.status(400).json({ error: error.message });
      }else{
      res.status(200).json("Success");
      res.end();
      // res.end()
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

app.post('/create_shop', (req, res) => {

  const shop_name = req.body.shop_name;

  console.log(shop_name);
  // res.clearCookie("access-token");
  

  const token = req.cookies["access-token"];

  console.log(token + "THIS TOKEN")

  const validToken = verify(token, "jwtSecret");
  console.log(validToken);
  var userId = validToken.user
  console.log(userId)  

  console.log(req.authenticated);  

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query("INSERT INTO shops (shop_name, id_shop_owner) VALUES (?, ?)", [shop_name, userId], function (error, results, fields) {
      // When done with the connection, release it.
      connection.release()
  
      // Handle error after the release.
      if (error){
        res.status(400).json({ error: error.message });
      }else{
      res.status(200).json("Success");
      res.end();
      }
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});


app.listen(process.env.PORT || 5000, () => {
  console.log('app listening on port ${PORT}');
});
