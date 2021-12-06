// server/index.js

const path = require('path');
const express = require("express");
const mysql = require('mysql');
const { response } = require('express');
const cors = require('cors')
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

const app = express();

let connection = mysql.createConnection(
  process.env.CLEARDB_DATABASE_URL
);
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());

// module.exports = connection;

app.get('/reviews', (req, res) => {
  connection.query('SELECT * FROM pokemon_species', function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});



connection.end()

// connection.query('SELECT * FROM heroku_db4deb156bbb8bb.pokemon_species', function (error, results, fields) {
//   if (error) {
//     console.log('error: ', err);
//     throw error;
//   }
//   response.send('The solution is: ', results[0].solution);
// });



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});