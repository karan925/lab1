const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

app.use(cors())
app.options('*', cors());

// app.get("/", function(req, res) {
//   res.send({"name": "Jane Doe"})
// })

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// if(process.env.NODE_ENV === "production"){
//   app.use(express.static('./client/build'))
// }

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "login"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });


app.listen(process.env.PORT || 5000, () => {
  console.log('app listening on port ${PORT}');
});
