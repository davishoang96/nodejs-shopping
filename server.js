var express = require('express');

var app = express();

const PORT = 3000;

app.listen(PORT, function(err){
  if (err) throw err;
  console.log("Server is running on port " + PORT);
});
