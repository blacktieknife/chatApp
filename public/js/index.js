var socket = io("/chatApp");
            
socket.on("connect", function(){
    console.log('connected to socket server on /chatApp');

    socket.emit("createMessage", {from:"blockhead", text:"this is a test message"});
    
});
            
socket.on("disconnect", function(){
      console.log("disconnected from socket server");
});

socket.on("newMessage", function(message){
  
    message["createdAt"] = new Date(message["createdAt"]).toLocaleString();
    
    console.log("new Message! ", message);
});


