const port = process.env.PORT || 8000;
const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname,"../public");

var app = express();

app.use(express.static(publicPath));

app.get("/", function(req, res){
    res.sendFile("index.html");
});

app.listen(port, function(){
    console.log(`server started. listening on port ${port}`)
});
