const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LiquidationModel = new Schema({
    titleProduct: {
        type: String,
        default: ''
    },
    priceProduct: {
        type: Number,
        default: 0,
    },
    amountProduct: {
        type: Number,
        default: 0
    },
    imageProduct: [{
        image: {
            type: String,
            default: '',
        }
    }],
    idOwner: {
        type: mongoose.ObjectId,
        ref: 'owners'
    },
    comments: [{
        idOwner: {
            type: mongoose.Types.ObjectId,
            default: null,
            ref: 'owners'
        },
        content: {
            type: String,
            default: '',
        }
    }],

}, {
    timestamps: true
});

module.exports = mongoose.model('liquidations', LiquidationModel);