// server.js
var express = require("express");
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/dist"));

// server.js

// var express = require('express');
// var serveStatic = require('serve-static');

// app = express();
// app.use(serveStatic(__dirname + "/dist"));

// var port = process.env.PORT || 5000;
// app.listen(port);

// console.log('Server started ' + port);

var USER_COLLECTION = "users";

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://vred:vred19@ds139956.mlab.com:39956/heroku_zjlrbqq9", { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});

//API ROUTES

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

/* User schema
  “_id”: ObjectId,
  “name”: String,
  “email”: String,
 */

app.get("/api/users", function(req, res) {
  db.collection(USER_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/users", function(req, res) {
  var newUser = req.body;
  // newUser.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(USER_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

