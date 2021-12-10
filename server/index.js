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
    if(err.code === "PROTOCOL_CONNECTION_LOST") { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      console.log(err)                                  // server variable configures this)
    }
  });
}

handleDisconnect();

// Export the data
module.exports = connection;

// Pokemon Species Query
app.get("/pokemonSpecies", (req, res) => {
  connection.query("SELECT * FROM pokemon_species", function (err, result) {
    if (err) res.status(400).json({Error: err});
    res.send(result)
  });
});

// Pokemon Types query
app.get("/pokemonTypes", (req, res) => {
  connection.query("SELECT * FROM poke_types", function (err, result) {
    if (err) res.status(400).json({Error: err});
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
    if (err) res.status(400).json({Error: err});
    res.send(result)
  });
});

// Pokemon Types Assigned to Pokemon query
app.get("/indivPokemonTypes", express.json(), (req, res) => {
  // Call: http://localhost:3000/indivPokemonTypes?type=typeNameHere
  // Example: http://localhost:3000/indivPokemonTypes?type=bug
  var poke_name = String(req.query.name);
  var sql = "SELECT * FROM indiv_pokemon_types WHERE poke_name = " + connection.escape(poke_name);
  connection.query(sql, (err, result) => {
    if (err) {
      if (err) res.status(400).json({Error: err});
    }
    res.send(result);
  });
});

// Get a user's teams - query
app.get("/userToTeamID", express.json(), (req, res) => {
  // Call: http://localhost:3000/userToTeamID
  // Example: http://localhost:3000/userToTeamID
  var userID = getId(req);
  var sql = `CALL user_to_team_ids(${userID})`;
  connection.query(sql, function (err, result) {
    if (err) res.status(400).json({Error: err});
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
    if (err) res.status(400).json({Error: err});
    res.send(result)
  });
});

// Register (save) a Pokemon team - query
app.post("/savePokemonTeam", express.json(), (req, res) => {

  // Params necessary for procedure call
  var teamName = String(req.query.teamName);
  var teamDesc = String(req.query.teamDesc);
  var memberID = getId(req);
  var poke1 = req.query.poke1;
  var poke2 = req.query.poke2;
  var poke3 = req.query.poke3;
  var poke4 = req.query.poke4;
  var poke5 = req.query.poke5;
  var poke6 = req.query.poke6;

  connection.query("CALL add_team(?, ?, ?, ?, ?, ?, ?, ?, ?)", [teamName, teamDesc, memberID, poke1, poke2, poke3, poke4, poke5, poke6], function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});

// Delete a saved Pokemon team - query
app.put("/deletePokemonTeam", express.json(), (req, res) => {
  var teamID = req.query.teamID;

  connection.query("CALL delete_team(?)", [teamID], function (err, result) {
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

// request that registers the user with the given username and password
app.post("/api/register", express.json(), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query("CALL add_user(?, ?, FALSE)", [username, password], function (err, results) {
    if (err) res.status(400).json({Error: err});
    const result = results[0][0];

    if (result.MESSAGE === 'User registered.') {
      const token = createTokens(result.member_id);
      res.cookie("accessToken", token, {
        maxAge: 2592000000,
      });
      res.json( {registered: true, message: result.MESSAGE, token: token} );
    } else {
      res.json( {registered: false, message: result.MESSAGE} );
    }
  });
});

// request that validates login details given the username and password
app.post("/api/login", express.json(), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(`CALL sign_in(?,?)`, [username, password], (err, results) => {
    if (err) {
      if (err) res.status(400).json({Error: err});
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

// request to get the username of the requested user 
app.get("/api/my-profile", (req, res) => {
  if (validateToken) {
    const id = getId(req);
    connection.query("SELECT username FROM member WHERE member_id=?", id, (err, results) => {
      if (err) res.status(400).json({Error: err});
      res.json({ username: results[0].username});
    });
  } 
});

// request to change the password of the requested user
app.put("/api/change-password", (req, res) => {
  if (validateToken) {
    const password = req.body.password;
    const id = getId(req);
    connection.query("CALL change_password(?,?)", [id, password], (err, results) => {
      if (err) res.status(400).json({Error: err});
      const result = results[0][0];
      if (result.MESSAGE === 'Password has been changed.') {
        res.json({success: true, message: result.MESSAGE});
      } else {
        res.json({success: false, message: result.MESSAGE});
      }
    });
  }
});

// request for backend to delete the user of the device and remove their cookies
app.delete("/api/delete-user", (req, res) => {
  if (validateToken) {
    const id = getId(req);
    connection.query("CALL delete_user(?)", id, (err, results) => {
      if (err) res.status(400).json({Error: err});
      const result = results[0][0];
      if (result.MESSAGE === 'User has been deleted.') {
        res.clearCookie("accessToken")
        res.json({deleted: true, message: result.MESSAGE});
      } else {
        res.json({deleted: false, message: result.MESSAGE});
      }
    });
  }
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Inform (to console) that server port has opened
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});