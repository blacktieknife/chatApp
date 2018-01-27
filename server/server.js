const port = process.env.PORT || 8000;
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,"../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//middleware
app.use(express.static(publicPath));
var chatApp = io.of("/chatApp");

app.get("/", function(req, res){
    res.sendFile("index.html");
});

chatApp.on("connection", function(socket){
    console.log("a new client has connected");
    
    socket.emit("newEmail", {"text":"Bbodbodbododob", "date":"12/22/2015", "from":"goober.net"});
    
    socket.on("createEmail", function(newEmail){
        console.log("Create email! ",newEmail);
    });
    
     socket.on("createMessage", function(message){
        var timeStamp = new Date().getTime();
         message.createdAt = timeStamp;
        chatApp.emit("newMessage",message);
        
    });
    
    socket.on("disconnect", function(socket){
    console.log("a client has disconnected");
});

    
});



server.listen(port, function(){
    console.log(`server started. listening on port ${port}`)
});
