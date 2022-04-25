const doctorModel = require("../models/DoctorModel");
const ownerModel = require("../models/OwnerModel");
const authenticationModel = require("../models/AuthenticationModel");
const Chats = require("../models/ChatModel");
const Messages = require("../models/MessageModel");
const { v4: uuidv4 } = require("uuid");
module.exports = (io) => {
  io.on("connection", function (socket) {

    socket.on("getDoctors", async ({ _id }) => {
      var doctors = await doctorModel.find({});
      doctors = doctors
        .map((doctor) => {
          return {
            _id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            dateOfBirth: doctor.dateOfBirth,
            phoneNumber: doctor.phoneNumber,
            gender: doctor.gender,
            image: process.env.API_URL + doctor.image,
            street: doctor.street,
            city: doctor.city,
            district: doctor.district,
            ward: doctor.ward,
            zipCode: doctor.zipCode,
          };
        })
        .filter((doctor) => {
          return doctor?.idNumber?.toString() === _id ? false : true;
        });
      // .map( (doctor)=>{
      //     const newAuthentication = authentication.filter((auth)=>(auth._id.toString()===doctor.idNumber.toString())?true:false)
      //     doctor.image = process.env.API_URL+doctor.image
      //     doctor._id = newAuthentication[0]._id
      //     return doctor
      // });

      socket.emit("getAllDoctors", doctors);
    });

    socket.on("startUniqueChat", async (uniqueChat, callback) => {
      if (!uniqueChat.recieverId) console.log("id người nhận không có");
      else {
        const user = {
          recieverId: uniqueChat.recieverId,
          senderId: uniqueChat.senderId,
        };
        const chat = await Chats.aggregate().match({
          recieverId: user.recieverId,
          senderId: user.senderId,
        });
        if (chat.length > 0) {
          socket.emit("openChat", { ...chat[0], idSocket: socket.id });
        } else {
          const chatAttempt = await Chats.aggregate([
            {
              $match: {
                recieverId: user.recieverId,
                senderId: user.senderId,
              },
            },
          ]);
          if (chatAttempt.length > 0)
            socket.emit("openChat", { ...chatAttempt[0], idSocket: socket.id });
          else {
            // Store the new Chat
            const newChat = await new Chats({
              ...user,
              roomId: uuidv4(),
            }).save();
            socket.emit("openChat", {
              ...newChat,
              idSocket: socket.id,
            });
          }
        }
      }
    });

    socket.on("joinTwoUsers", ({ roomId }, dispatch) => {
      socket.join(roomId);

      dispatch({ roomId });
    });
    //load messanges

    socket.on("loadMessages", async ({ senderId, recieverId }, dispatch) => {
      // console.log(senderId,recieverId)
      const messages = await Messages.find({
        $or: [
          { $and: [{ senderId }, { recieverId }] },
          { $and: [{ senderId: recieverId }, { recieverId: senderId }] },
        ],
      });
      // $and:[
      //     {$or:[{senderId},{recieverId}]},
      //     {$or:[{senderId:recieverId},{recieverId:senderId}]}
      // ]
      // console.log(messages)
      return dispatch(
        messages.filter(
          (mess) =>
            (mess.senderId === senderId || mess.recieverId === senderId) &&
            (mess.senderId === recieverId || mess.recieverId === recieverId)
        )
      );
    });

    // socket.on('recievedMessages',async({myId},dispatch)=>{
    //     const message=await Messages.find({idOwner:myId});

    //     return dispatch(message)

    // })
    socket.on("sendToUser", (data) => {
      io.to(data.roomId).emit("dispatchMessage", { ...data });
      const {
        roomId,
        senderId,
        recieverId,
        composeMessage: { textMessage, time },
      } = data;
      new Messages({
        roomId,
        senderId,
        recieverId,
        textMessage,
      }).save();
    });

    socket.on("me",async (_id,element) => {
        element(socket.id);
        const doctor = await doctorModel.findByIdAndUpdate(_id,{idSocket:socket.id})
        if(!doctor){
            const owner = await ownerModel.findByIdAndUpdate(_id,{idSocket:socket.id})
        }
    });
    
    socket.on("forceDisconnect",async(_id)=>{
      socket.on("disconnect",async (value) => {
        const doctor = await doctorModel.findByIdAndUpdate(_id,{idSocket:""})
          if(!doctor){
              const owner = await ownerModel.findByIdAndUpdate(_id,{idSocket:""})
          }
        socket.broadcast.emit("callEnded");
        
      });
    })
    
    socket.on("callUser",async (data) => {
      // console.log(data.userToCall)
      var idSocket=""
      const findDoctor = await doctorModel.findById(data.userToCall);
      if(!findDoctor){
        const findOwner = await ownerModel.findById(data.userToCall);
        idSocket= findOwner.idSocket
      }else
        idSocket = findDoctor.idSocket
      io.to(idSocket).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });
    // socket.emit("test123",socket.id);
    socket.on("answerCall", (data) => {
      console.log(data)
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });
};
