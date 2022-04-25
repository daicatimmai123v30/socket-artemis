const firebase=require('firebase/app');
require('firebase/auth')
const fb = firebase.initializeApp({
    apiKey: "AIzaSyD2jX5xwLa_Ohm9aF4xc2FDalxjm_c_XjY",
    authDomain: "nodejs-c1196.firebaseapp.com",
    projectId: "nodejs-c1196",
    storageBucket: "nodejs-c1196.appspot.com",
    messagingSenderId: "112012504283",
    appId: "1:112012504283:web:639c0a8b23cd8a102bf0fe",
    measurementId: "G-0Z0L9N1KV0"
})

module.exports = fb