// server/index.js

const path = require("path");
const express = require("express");
const { response, json } = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken, getId } = require("./jwt");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// MySQL connection
var connection;

function handleDisconnect() {
  // Recreate the connection, since the old one cannot be reused.
  // connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
  connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      //console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you"re also serving http, display a 503 error.
  connection.on("error", function(err) {
    //console.log("db error", err);
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

// Pokemon Species Query
app.get("/pokemonSpecies", (req, res) => {
  connection.query("SELECT * FROM pokemon_species", function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// Pokemon Types query
app.get("/pokemonTypes", (req, res) => {
  connection.query("SELECT * FROM poke_types", function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// Pokemon Type Effectiveness query
app.get("/typeEffectiveness", express.json(), (req, res) => {
  // Call: http://localhost:3000/typeEffectiveness?type1={type1}&type2={type2}
  // Example: http://localhost:3000/typeEffectiveness?type1="fire"&type2="flying"
  var type1 = req.query.type1;
  var type2 = req.query.type2;
  var sql = `CALL calculate_weaknesses(${type1}, ${type2})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// Pokemon Types Assigned to Pokemon query
app.get("/indivPokemonTypes", express.json(), (req, res) => {
  // Call: http://localhost:3000/indivPokemonTypes?type=typeNameHere
  // Example: http://localhost:3000/indivPokemonTypes?type=bug
  var poke_name = req.query.name;
  var sql    = 'SELECT * FROM indiv_pokemon_types WHERE poke_name = ' + connection.escape(poke_name);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Get a user's teams - query
app.get("/userToTeamID", express.json(), (req, res) => {
  // Call: http://localhost:3000/userToTeamID?userID={userIDNumber}
  // Example: http://localhost:3000/userToTeamID?userID=2
  var userID = req.query.userID;
  var sql = `CALL user_to_team_ids(${userID})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// Get a list of Pokemon that represent a team (given ID) - query
app.get("/teamIDToPokemon", express.json(), (req, res) => {
  // Call: http://localhost:3000/teamIDToPokemon?teamID={teamIDNumber}
  // Example: http://localhost:3000/teamIDToPokemon?teamID=1
  var teamID = req.query.teamID;
  var sql = `CALL team_id_to_pokemon(${teamID})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Send register user data
app.post("/api/register", express.json(), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query("CALL add_user(?, ?, FALSE)", [username, password], function (err, results) {
    if (err) console.log(err);
    const result = results[0][0];

    if (result.MESSAGE === 'User registered.') {
      const token = createTokens(result.member_id);
      res.cookie("accessToken", token, {
        maxAge: 2592000000,
      });
      res.json( {registered: true, token: token} );
    } else {
      res.json( {registered: false, message: result.MESSAGE} );
    }
  });
});

// Send login user data
app.post("/api/login", express.json(), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(`CALL sign_in(?,?)`, [username, password], (err, results) => {
    if (err) {
      console.log(err);
    }

    const member = results[0][0];
    if (member.auth) {
      const token = createTokens(member.member_id);
      res.cookie("accessToken", token, {
        maxAge: 2592000000,
      });
      res.json( { auth: member.auth,  token: token });
    } else {
      res.json( { auth: member.auth });
    }
  });
});

app.get("/api/profile", validateToken, (req, res) => {
  const id = getId(req);
  connection.query("SELECT username FROM member WHERE member_id=?", id, (err, results) => {
    res.json(result[0].username);
  });
});

// Inform (to console) that server port has opened
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});