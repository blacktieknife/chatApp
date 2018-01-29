const port = process.env.PORT || 8000;
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,"../public");
const {generateMessage} = require('./utils/message.js');
const {generateLocation} = require('./utils/message.js');
const {isRealString} = require("./utils/validator.js");
const {Users} = require("./utils/users.js");
const ejs = require('ejs');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var User = new Users();

app.set('view engine', 'ejs');

//middleware

app.use(express.static(publicPath));
var chatApp = io.of("/chatApp");

app.get("/", function(req, res){
    res.sendFile("index.html");
});

chatApp.on("connection", function(socket){
    console.log("a new client has connected");
    var socketID = socket.id;

    
    socket.on("join", function(params, callback){
        
        
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("Name and Room are required");
        }
        
        User.addUser(socket.id,params.name,params.room);
        var userList = User.getUserList(params.room);
        console.log(userList);
        socket.join(params.room);
       chatApp.to(params.room).emit("updateUsers", userList); socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} has joined the chat!`));
        console.log(User.users);
        
//            socket.emit("newMessage",generateMessage("Admin","Welcome to the chat"));
//    socket.broadcast.emit("newMessage",generateMessage("Admin","User joined the chat"));
        callback();
    });
       
    socket.on("createLocation", function(location){
        console.log("recieved location", location);
        chatApp.emit("newLocation", generateLocation(location.from, location.latitude, location.longitude))
    });
    
    
     socket.on("createMessage", function(message, callback){
         chatApp.emit("newMessage",generateMessage(message.from,message.text));
        
         callback("a-ok!");
//        socket.broadcast.emit("newMessage",message);
        
    });
    
    socket.on("disconnect", function(socket){
       
        var user = User.removeUser(socketID);
chatApp.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} left the chat`));
    chatApp.to(user.room).emit("updateUsers", User.getUserList(user.room));
    console.log(`${user.name} has disconnected`);
        
});

    
});



server.listen(port, function(){
    console.log(`server started. listening on port ${port}`)
});
