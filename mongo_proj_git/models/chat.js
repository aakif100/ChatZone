const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    from : {
        type: String,
        required : true
    } ,
    to : {
        type : String
    } ,

    msg : {
        type : String ,
        required : true ,
        maxLength : 50 

    } ,

    created : {
        type : Date ,
        required : true

    }
})

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat ;
// here we are exporting chat only which is collection...