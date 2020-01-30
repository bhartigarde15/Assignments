var express = require("express");
var app = express();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo"
});

connection.connect(function(error) {
  if (!!error) console.log("Error in connection-", error);
  else console.log("Connected");
});

app.use((request, response, next) => {
  response.set("Access-Control-Allow-Origin", request.get("origin"));
  response.set("Access-Control-Allow-Headers", "Content-Type");
  response.set("Access-Control-Allow-Methods", "GET,POST");

  next();
});
app.use(express.json());

app.get("/students", function(req, res) {
  connection.query("SELECT * FROM demo", function(err, result, fields) {
    if (err) throw err;
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

app.post("/deleteStudent", function(req, res) {
  console.log(req.body.rollno);
  res.sendStatus(200);
  connection.query(
    "Delete from demo where rollno=" +
      req.body.rollno +
      " and name='" +
      req.body.name +
      "'"
  );
});

app.post("/addStudent", function(req, res) {
  console.log(req.body.rollno);
  res.sendStatus(200);
  connection.query(
    "Insert into demo values(" + req.body.rollno + ",'" + req.body.name + "')"
  );

  // connection.query("SELECT * FROM demo", function(err, result, fields) {
  //   if (err) throw err;
  //   res.json(JSON.parse(JSON.stringify(result)));
  // });
});

app.listen(5000);
