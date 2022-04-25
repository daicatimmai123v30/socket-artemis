const mongoose  =require('mongoose');
const Schema = mongoose.Schema;

const AuthenticationModel = new Schema({
    phoneNumber:{
        type:String,
        default:'',
        unique:true
    },
    password:{
        type:String,
        default:'',
        unique:true
    },
    lockStatus:{
        type:Boolean,
        default:false
    },
    modifiedBy:{
        type:String,
        default:''
    },
    createdBy:{
        type:String,
        uppercase:true,
        enum:['USER','VET'],
        default:'USER'
    },
    canceledStatus:{
        type:Number,
        default:0,
        min:0
    }
},{timestamps:true});

module.exports = mongoose.model('authentications',AuthenticationModel);