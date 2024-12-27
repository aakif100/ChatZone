const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
// const { error } = require("console");


let port = 1010;

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

// below for patch override : 
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

// to get value from post request as req.body :
app.use(express.urlencoded({extended:true}));




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatzone');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

  main()
  .then((res)=>{
    console.log(`connection successful`);
    
  })

  .catch((err)=>{
    console.log(err);
    
  })

// creating a chat data :

// let chat1 = new Chat({
//     from : "Aakif",
//     to : "nuha" , 
//     msg : "hello",
//     created : new Date()
// })


// chat1.save()
// .then((res)=>{
//     console.log(res);
    
// })

// .catch((err)=>{
//     log(err)
// })






//  listen for phone connection aswell this allows..This way the link will work regardless of how you're accessing the site (localhost, IP address, or domain name).
// I noticed you already have the correct server setup in your index.js with:


app.listen(port , '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:1010');
});


// Add this route before other routes
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/chats" , async (req , res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    
    // fectching all the datas freom the db .. but this is async soo add await and async
    // res.send("success");
    res.render("index.ejs" , { chats })
})


app.get("/chats/new", (req, res )=>{
    // res.send("success");
    res.render("newchat.ejs");
})



app.post("/chats", (req , res)=>{
   let chat = req.body;
  //  console.log(chat);

   let newChat = new Chat({
    from : `${chat.from}`,
    to : `${chat.to}` , 
    msg : `${chat.msg}` , 
    created : new Date()
    

   })
   
   newChat.save()

   .then((res)=>{
    console.log("chat was saved");
    
   })

   .catch((err)=>{
    console.log(err);
    
   })

   res.redirect("/chats");
   
})


// edit route : 

app.get("/chats/:id/edit" , async (req ,res) =>{
  let { id } = req.params ;
  let chat = await Chat.findById(id) ;
  console.log(chat);
  
  res.render("edit.ejs" , {chat} );
  console.log(`id is  :::: ${id}`);
  
})


// edit in put :

app.put("/chats/:id/edit", async (req,res)=>{
  let { id } = req.params; 
  let info = req.body;
  
  await Chat.findByIdAndUpdate(
    id, 
    {
      msg: info.msg,
      updated_at: new Date()
    }, 
    {runValidators: true, new: true}
  );

  res.redirect("/chats");
});


// delete :

app.delete("/chats/:id", async  (req , res)=>{
  let { id } = req.params ; 

   let deletedChat = await Chat.findByIdAndDelete(id);
   console.log("the below chat is deleted permanently:");
   
  console.log(deletedChat);
  
   res.redirect("/chats");
})



