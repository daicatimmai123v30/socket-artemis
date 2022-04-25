const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plug = require("mongoose-slug-generator");

mongoose.plugin(plug);

const Doctor = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
    gender: {
      type: String,
      enum: ["Nam", "Nữ", "Giới Tính Thứ 3"],
    },
    image: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    ward: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
      // maxlength:6,
      // minlength:6
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Accounts",
    },
    review: [
      {
        idOwner: {
          type: mongoose.Types.ObjectId,
          default: null,
          ref: "owners",
        },
        rating: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
        comments: {
          type: String,
          default: "",
        },
      },
    ],
    idSocket: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctors", Doctor);
