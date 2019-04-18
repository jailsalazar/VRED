// server.js
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";
var DATA_COLLECTION = "data";
var EVALUATION_COLLECTION = "evaluation";

var app = express();
app.use(bodyParser.json());

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
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
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
  db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/users", function(req, res) {
  console.log(req);
  var newUser = req.body;
  newUser.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

// DATA API ENDPOINTS
/* Data schema
  “heartrate”: Number,
  “gsr”: Number,
  “ecg”: Number,
 */
app.get("/api/data", function(req, res) {
  db.collection(DATA_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get previous data.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/data", function(req, res) {
  console.log(req);
  var newData = req.body;
  newData.createDate = new Date();

  if (!req.body) {
    handleError(res, "Invalid data input", "Must provide data.", 400);
  } else {
    db.collection(DATA_COLLECTION).insertOne(newData, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new data entry.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

// SELF EVALUATION API ENDPOINTS
/* Evaluation schema
  "evaluation": Object
 */
app.get("/api/evaluation", function(req, res) {
  db.collection(EVALUATION_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get previous data.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/evaluation", function(req, res) {
  console.log(req);
  var newEvaluation = req.body;
  newEvaluation.createDate = new Date();

  if (!req.body) {
    handleError(res, "Invalid data input", "Must provide data.", 400);
  } else {
    db.collection(EVALUATION_COLLECTION).insertOne(newEvaluation, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new data entry.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});