const port = process.env.PORT || 8000;
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,"../public");
const {generateMessage} = require('./utils/message.js');

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
    
    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat"));
    socket.broadcast.emit("newMessage",generateMessage("Admin","User joined the chat"));
       
    
     socket.on("createMessage", function(message, callback){
         chatApp.emit("newMessage",generateMessage(message.from,message.text));
         callback("a-ok!");
//        socket.broadcast.emit("newMessage",message);
        
    });
    
    socket.on("disconnect", function(socket){
        chatApp.emit("newMessage",generateMessage("Admin","User left the chat"));
    console.log("a client has disconnected");
});

    
});



server.listen(port, function(){
    console.log(`server started. listening on port ${port}`)
});
