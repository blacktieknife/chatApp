var expect = require("expect");
const {Users} = require("./users.js");


 var users = new Users();
        var user = {
            id:123,
            name:"bung",
            room:"creeps"
            }
        var respUser = users.addUser(user.id, user.name, user.room);
       // expect(users.users).toEqual([user]);
console.log("expect user to have added to users Array", users.users)
