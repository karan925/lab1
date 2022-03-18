const mysql = require("mysql");

const db = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b16d75e015fe82",
    password: "4bd269ff",
    database: "heroku_719defa3128be15"
}
)

module.exports= db;
