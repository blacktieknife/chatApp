var socket = io("/chatApp");


socket.on("connect", function(){
    console.log('connected to socket server on /chatApp');
    
});
            
socket.on("disconnect", function(){
      console.log("disconnected from socket server");
});

socket.on("newMessage", function(message){
    var messageTemplate = $("#message-template").html();
    var date = moment(message.createdAt).format("MMM Do YYYY h:mm:ss a");
    var html = Mustache.render(messageTemplate, {
        from:message.from,
        text:message.text,
        createdAt:date
    });
    
    $("#messages").append(html);

});

socket.on("newLocation", function(location){
    var locationTemplate = $("#location-template").html();
    var date = moment(location.createdAt).format("MMM Do YYYY h:mm:ss a");
    var html = Mustache.render(locationTemplate, {
        from:location.from,
        url:location.url,
        createdAt:date
    });
    
    $("#messages").append(html);

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
        //console.log(position);
        socket.emit('createLocation', {
            from:"Blockhead",
            latitude:position.lat,
            longitude:position.long
        });
        locButton.attr("disabled", false);
        locButton.text("Share Location");

    }).catch(function(err){
        alert(err);
        locButton.attr("disabled", false);
        locButton.text("Share Location");
    });
     
} else {
  
  /* geolocation IS NOT available */
      alert("geoLocation is not available");
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
