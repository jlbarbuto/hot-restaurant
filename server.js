//Declare depenancies
var path = require("path");
var bodyParser = require ("body-parser");
var express = require ("express");

//Initialize Express
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Delcare Variables

var tablesArr = [];
var waitlistArr = [];
var fullTable = {full: false, id: 1};

//Declare Routes
app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/form", function(req, res) {
res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/api/wait", function(req, res) {
return res.json(waitlistArr);
});

app.get("/api/tables", function(req, res) {
return res.json(tablesArr);
});

app.get("/api/full", function(req, res) {
return res.json(fullTable);
});

app.post("/api/tables", function(req, res) {
  checkLength(req,res);
});

//Declare functions

function checkLength (req,res){
var newtable = req.body;

  if (tablesArr.length < 5) {
  
tablesArr.push(newtable);

  res.json(newtable);
fullTable.id = fullTable.id + 1;
}
else{
waitlistArr.push(newtable);

  res.json(newtable);
fullTable.id = fullTable.id + 1;
fullTable.full = true;

};
};

//Initialize

app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});