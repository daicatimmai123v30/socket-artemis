const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const appointment = new Scheme({
    idOwner: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref:'owners'
    },
    idDoctor: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref:'Doctors'
    },
    createdBy: {
        type: String,
        default: ''
    },
    modifiedBy: {
        type: String,
        default: ''
    },
    canceledDate: {
        type: Date,
        default: ''
    },
    canceledBy: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum:['CANCELED','WAITING','FINISHED','REQUESTING'],
        default: 'REQUESTING',
    },
    idPet:{
        type:mongoose.Types.ObjectId,
        ref:'pets',
        default:null,
    },
    content:{
        type:String,
        default:''
    },
    startDate:{
        type:String,
        default:''
    },
    endDate:{
        type:String,
        default:''
    },
    Location:{
        type:mongoose.Types.ObjectId,
        default:null,

    }
}, {
    timestamps: true
});

module.exports = mongoose.model('appointments',appointment)