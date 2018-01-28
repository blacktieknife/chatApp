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
    $("#messages").append("<li><span class='message__header'><span style='font-weight:bold;'>"+message.from+"</span> <span class='message_timestamp'>@:"+message.createdAt+"</span></span><hr>"+message.text+"<br><br></li>")
});


var locButton = $("#abt");

locButton.on("click", function(){

if ("geolocation" in navigator) {
    
  /* geolocation is available */
let currentLocation = new Promise(function(resolve, reject){
    
navigator.geolocation.getCurrentPosition(function(position) {
   resolve({lat:position.coords.latitude, long:position.coords.longitude, url:`https://www.google.com/maps/place/${position.coords.latitude},${position.coords.longitude}`});

}, function(err){
    reject("cannot fetch location");
});
    
});
    
    locButton.attr("disabled", "disabled");
    locButton.text("Fetching Location");
    
    currentLocation.then(function(position){
        console.log(position);
        socket.emit('createMessage', {
            from:"Blockhead",
            text:`This is my current location, <a target='_blank' href='${position.url}'>Map</a>`
        }, function(data){
              if(data == "a-ok!"){
                console.log(data);
                locButton.attr("disabled", false);
                locButton.text("Share Location");
            } else {
                console.log("something broke");
            }
        });
//$("#chatArea").prepend("From:'Admin'<hr>This is my current location <a href="+position.url+">map</a><br><br>")
    }).catch(function(err){
        alert(err);
        locButton.attr("disabled", false);
        locButton.text("Share Location");
    });
     
} else {
    alert("geoLocation is not available");
  /* geolocation IS NOT available */
}
    
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
    $("#din").val('');
});
