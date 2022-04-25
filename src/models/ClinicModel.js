const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Clinics = new Schema({
    nameClinic: {
        type: String,
        default: '',
    },
    landLine: {
        type: String,
        default: '',
    },
    street: {
        type:String,
        default:''
    },
    city: {
        type: String,
        default:''
    },
    district: {
        type: String,
        default:''
    },
    province: {
        type: String,
        default: ''
    },
    zipCode: {
        type: String,
        default: ''
    },
    avatar:{
        type:String,
        default:''
    },
    review:[{
        idOwner:{
            type:mongoose.Types.ObjectId,
            default:null,
            ref:'owners'
        },
        rating:{
            type:Number,
            default:0,
            min:0,
            max:5,
        },
        comments:{
            type:String,
            default:'',
        }
    }]

},{timestamps:true});
module.exports= mongoose.model('clinics',Clinics);