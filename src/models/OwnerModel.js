const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerModel = new Schema({
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
    default: "",
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ", "Giới tính thứ 3"],
    default: "",
  },
  cmnd: {
    type: String,
    default: "",
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
  // zipCode:{
  //     type:String,
  //     maxlength:6,
  //     minlength:6
  // },
  idNumber: {
    type: Schema.Types.ObjectId,
    ref: "authentications",
  },
  idSocket: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("owners", OwnerModel);
