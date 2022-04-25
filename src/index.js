
const express = require('express');
const app = express();
// const cors = require('cors');
const db = require('./config/db/index');
const http = require('http');
const socketio = require('socket.io');
const session = require('express-session')
const MongoStore = require('connect-mongo');


require('dotenv').config();


const server = http.createServer();
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});



// Init our socket

db.connection();
// app.use(express.json());
// app.use(cors());
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.DATABASE_LOCAL
//   })
// }));


// middleware
// require('./app/socket')(io);
server.listen(process.env.PORT || 4444, ()=>{console.log("Connected socket")})
