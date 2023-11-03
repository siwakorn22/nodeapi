const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Create
app.post("/add", (req, res) => {
  const newUser = { name: req.body.name, email: req.body.email };
  const sql = "INSERT INTO users SET ?";
  db.query(sql, newUser, (err, result) => {
    if (err) throw err;
    res.send("User added...");
  });
});

// Read
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update
app.put("/update/:id", (req, res) => {
  const sql = `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("User updated...");
  });
});

// Delete
app.delete("/delete/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("User deleted...");
  });
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
