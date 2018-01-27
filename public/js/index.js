var socket = io("/chatApp");
            
socket.on("connect", function(){
    console.log('connected to socket server on /chatApp');
    
});
            
socket.on("disconnect", function(){
      console.log("disconnected from socket server");
});

socket.on("newMessage", function(message){
  
    message["createdAt"] = new Date(message["createdAt"]).toLocaleString();
    
    console.log("new Message! ", message);
    $("#chatArea").append("From:"+message.from+" @:"+message.createdAt+"<hr>"+message.text+"<br><br>")
});



$("#cF").on("submit", function(e){
    e.preventDefault();
    var inputVal = $("#din").val();
    if(inputVal.length > 0){
        socket.emit("createMessage", {from:"blockhead", text:inputVal}, function(data){
       
            if(data == "a-ok!"){
                console.log(data);
            } else {
                console.log("something broke");
            }
    });
    } else {
        
    }
    $("#din").val("");
});
