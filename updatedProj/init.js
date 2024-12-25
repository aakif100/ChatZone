const mongoose = require('mongoose');
const Chat = require("./models/chat.js");



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatzone');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

  main()
  .then((res)=>{
    // console.log(res);
    console.log(`connection successful`);
    
    
  })

  .catch((err)=>{
    console.log(err);
    
  })



// create a db datas :

let allChats = [
    {
        from : "rakesh",
        to : "suresh" , 
        msg : "when will we get exam study leave??",
        created : new Date()
    } , 
    {
        from : "habib",
        to : "walder" , 
        msg : "send the notes",
        created : new Date()
    } ,
    {
        from : "girish",
        to : "anjelina" , 
        msg : "implaying rn",
        created : new Date()
    } ,
    {
        from : "lolith",
        to : "anjelina" , 
        msg : "no news long time??!!!",
        created : new Date()
    }
]

  Chat.insertMany(allChats);



