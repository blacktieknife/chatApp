
class Users {
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        let data = {};
        data['id']= id;
        data['name'] = name;
        data['room'] = room;
        this.users.push(data);
        return data;
    }
    removeUser(id){
        var Users = this;
         var returnVal;
        console.log("remove by this id", id);
        Users.users.forEach(function(val,i){
            if(val.id == id){
             returnVal = val;
            Users.users.splice(i,1);
                
            }
            
});
        return returnVal;
    }
    getUserList(room){
        var returnUsers = [];
        this.users.forEach(function(val,i){
            if(val.room === room){
            returnUsers.push(val.name);
            }
        });
        return returnUsers;
    }
    getUser(id){
        for(let i=0; i<this.users.length; i++){
            if(this.users[i].id === id){
                return this.users[i];
            }
        }
    //return this.users.filter(function(user){return user.id == id})[0];
    }
}


module.exports = {
    Users:Users
};
