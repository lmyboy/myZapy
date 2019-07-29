const firebase = require('firebase');

firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "myzapy.firebaseapp.com",
    databaseURL: "https://myzapy.firebaseio.com",
    projectId: "myzapy",
    storageBucket: "",
    messagingSenderId: "37526059600",
    appId: "1:37526059600:web:b16b165b46435ee7",
});

module.exports = firebase.database();