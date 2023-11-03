const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "User API",
      description: "User API Documentation",
      contact: {
        name: "Your Name",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
  
/**
 * @swagger
 * /add:
 *  post:
 *    description: Add a new user
 *    parameters:
 *      - name: user
 *        in: body
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *    responses:
 *      '200':
 *        description: User added
 */
app.post("/add", (req, res) => {
  // ... (same as before)
});

/**
 * @swagger
 * /users:
 *  get:
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: A list of users
 */
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

/**
 * @swagger
 * /update/{id}:
 *  put:
 *    description: Update a user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: user
 *        in: body
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *    responses:
 *      '200':
 *        description: User updated
 */
app.put("/update/:id", (req, res) => {
  // ... (same as before)
});

/**
 * @swagger
 * /delete/{id}:
 *  delete:
 *    description: Delete a user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      '200':
 *        description: User deleted
 */
app.delete("/delete/:id", (req, res) => {
  // ... (same as before)
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
