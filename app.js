// myZapy


// Adicionando o Express ao projeto, é preciso instalar antes com: 
// npm i express --save -> é para escrever no package.json

//===== EXTERNAL IMPORTS
//express
const express = require('express');
const app = express();

//path
const path = require('path');

//.env
const dotenv = require('dotenv');

//bodyParser
const bodyParser = require('body-parser');

//===== INTERNAL IMPORTS


//===== MIDDLEWERE

dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/views', express.static('views')); // permitir acesso estático a pasta views

// ======= FUNCTIONS

const getViewPath = (view) => {
    return path.join(__dirname, `./views/${view}/${view}.html`);
}

// ====== ROUTES
app.use('/api/user', require('./routes/user'));
app.use('/api/message', require('./routes/message'));


// ======= VIEWS
app.get('/', (req, res)=> {
    res.sendFile(getViewPath('home'));
});

app.get('/:view', (req, res) => {
    res.sendFile(getViewPath(req.params.view), err => {
        if(err){
            res.send('404');
        }
    });
})




// ====== Server run

app.listen(2018, ()=> {
    console.log('Rôdando!\n');
});