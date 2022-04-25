const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chats = new Schema({
    senderId:{
        type:String,
        required:true
    },
    recieverId:{
        type:String,
        required:true,
    },
    roomId:{
        type:String,
        required:true
    }

},{timestamps:true});
module.exports= mongoose.model('chats',Chats);