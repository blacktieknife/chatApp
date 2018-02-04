var socket = io("/chatApp");


socket.on("connect", function(){
    var params = $.deparam(window.location.search);
    console.log(params);
    
    socket.emit('join', params, function(err){
        if(err){
            window.alert(err);
            window.location.href = "/";
        }else{
            console.log("everthing looks good fomrt his end.")
        }
    });
});

socket.on("updateUsers", function(users){
 
    $("#users").empty();
users.forEach(function(val,i){
   var usersTemplate = $("#users-template").html();
    var html = Mustache.render(usersTemplate, {
        name:val,
    });
    
    $("#users").append(html);
});

fixScroll();
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
fixScroll();
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
fixScroll();
});

function fixScroll(){
    var messageArea = $("#messages");
    var newMessage = messageArea.children("li:last-child");
    var clientHeight = messageArea.prop("clientHeight");
     var scrollTop = messageArea.prop("scrollTop");
     var scrollHeight = messageArea.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messageArea.scrollTop(scrollHeight);
    } else {
        
    }
}

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
        socket.emit("createMessage", {text:inputVal}, function(data){
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
