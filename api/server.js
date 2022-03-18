const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors())
app.options('*', cors());

app.get("/", function(req, res) {
  res.send({"name": "Jane Doe"})
})

// var con = mysql.createConnection({
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


app.listen(process.env.PORT || PORT, () => {
  console.log('app listening on port ${PORT}');
});
