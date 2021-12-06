// server/index.js

const path = require("path");
const express = require("express");
const mysql = require("mysql");
const { response } = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { createTokens } = require("./jwt");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(cookieParser());


// MySQL connection
var connection;

function handleDisconnect() {
  // Recreate the connection, since the old one cannot be reused.
  connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you"re also serving http, display a 503 error.
  connection.on("error", function(err) {
    console.log("db error", err);
    if(err.code === "PROTOCOL_CONNECTION_LOST") { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

// // TODO: handle timeouts (MySQL connection drops after x time)
// // https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
// let connection = mysql.createConnection(
//   process.env.CLEARDB_DATABASE_URL
// );
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// Export the data
module.exports = connection;

// Example Query
app.get("/pokemonSpecies", (req, res) => {
  connection.query("SELECT * FROM pokemon_species", function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// connection.end()

// connection.query("SELECT * FROM heroku_db4deb156bbb8bb.pokemon_species", function (error, results, fields) {
//   if (error) {
//     console.log("error: ", err);
//     throw error;
//   }
//   response.send("The solution is: ", results[0].solution);
// });



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  connection.query("CALL add_user(?, ?, FALSE)", username, password, function (err, result) {
    if (err) res.status(400).json({ error : err });
    res.json(result);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query("CALL sign_in(?, ?)", username, password, function (err, result) {
    if (err) res.status(400).json({ error : err });

    if (result.length == 2) {
      const token = createTokens(result[1]);
      res.cookie("accessToken", token, {
        maxAge: 2592000000, // 30 days in milliseconds
      });
    }

    res.json(result[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});