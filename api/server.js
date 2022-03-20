const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const { Http2ServerResponse } = require("http2");


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

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// const db = mysql.createConnection({
//   user: "b16d75e015fe82",
//   host: "us-cdbr-east-05.cleardb.net",
//   password: "4bd269ff",
//   database: "heroku_719defa3128be15"
// });

// db.connect( (error) => {
//   if(error){
//     console.log(error)
//   } else{
//     console.log("DB Connected....")
//   }
// })

// var db_config = {
//   host: 'us-cdbr-east-05.cleardb.net',
//     user: 'b16d75e015fe82',
//     password: '4bd269ff',
//     database: 'heroku_719defa3128be15'
// };

// var connection;

// function handleDisconnect() {
//   connection = mysql.createConnection(db_config);


//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });      

//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
// }
// handleDisconnect();

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
        // console.log(results)
        // console.log(results)

        const id = results[0].id;
        const token = jwt.sign({id}, "jwtSecret", {
          expiresIn: 300
        });
        req.session.user = results;
        console.log(req.session.user);
        res.json({auth: true, token: token, result: results});
      } else{
        // res.status(400).json({ error: "Incorrect email/password combination" });
        res.status(400).json({auth: false, message: "No user exists"});
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


app.listen(process.env.PORT || 5000, () => {
  console.log('app listening on port ${PORT}');
});
