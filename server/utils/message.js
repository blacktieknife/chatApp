const moment = require('moment');

var generateMessage = function(from,text){
    var data = {}
    data['from'] = from;
    data['text'] = text;
    data['createdAt'] = moment().valueOf();

    return data;
    
}

var generateLocation = function(from, latitude, longitude){
    
    var data = {}
    data['from'] = from;
    data['url'] = `https://www.google.com/maps/place/${latitude},${longitude}`;
    data['createdAt'] = moment().valueOf();
console.log("generate Loction event fired heres the location", data)
    return data;
    
}

module.exports = {
    generateMessage:generateMessage,
    generateLocation:generateLocation
}
