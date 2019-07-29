// myZapy


// Adicionando o Express ao projeto, é preciso instalar antes com: 
// npm i express --save -> é para escrever no package.json
const express = require('express');

const app = express();

app.get('/', (req, res)=> {
    res.send('yay');
});

app.listen(2018, ()=> {
    console.log('Rôdando!\n');
});