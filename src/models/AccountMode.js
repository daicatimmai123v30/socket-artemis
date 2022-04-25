const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountModel = new Schema({
    username: {
        type: String,
        default: '',
        unique:true,
    },
    password: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'DOCTOR',
        enum:['DOCTOR','ADMIN','NURSE'],
        uppercase: true
    },
    createdBy: {
        type: String,
        default: 'ADMIN',
        uppercase: true
    },
    modifiedBy: {
        type: String,
        default: 'ADMIN',
        uppercase: true
    },
    idClinic:{
        type:mongoose.Types.ObjectId,
        ref:'clinics',
        default:null
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('Accounts',AccountModel);