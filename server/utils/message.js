var generateMessage = function(from,text){
    var data = {}
    data['from'] = from;
    data['text'] = text;
    data['createdAt'] = new Date().getTime();
    return data;
}

module.exports = {
    generateMessage:generateMessage
}
