const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PetModel = new Schema({
    breed:{
        type:String,
        enum:['Con Chó','Con Mèo','Con Chim','Con Thỏ'],
        required:true
    },
    species:{
        type:String,
        required:true,
        default:''
    },
    namePet:{
        type:String,
        required:true,
        default:''
    },
    gender:{
        type:String,
        enum:['Đực','Cái'],
        required:true,
        default:''
    },
    age:{
        type:Number,
        default:0,
        default:''
    },
    weight:{
        type:Number,
        default:0,
        default:''
    },
    statusPet:{
        type:String,
        enum:['Chưa chết','Đã chết'],
        default:'Chưa chết',
    },
    statusRecord:{
        type:String,
        enum:[''],
        default:''
    },
    avatar:{
        type:String,
        default:'',
    },
    imagePet:[{
        image:{
            type:String,
            required:true,
            default:''
        }
    }],
    idOwner:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'owners'
    },
    idIllness:{
        type:String,
        default:''
    },
},{
    timestamps:true
})

module.exports =mongoose.model('pets',PetModel)