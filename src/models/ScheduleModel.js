const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleModel = new Schema({
    idDoctor: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref:'Doctors'
    },
    startDate:{
        type:String,
        default:''
    },
    endDate:{
        type:String,
        default:''
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedules',ScheduleModel);