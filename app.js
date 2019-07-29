// myZapy


// Adicionando o Express ao projeto, é preciso instalar antes com: 
// npm i express --save -> é para escrever no package.json
const express = require('express');
const path = require('path');


const app = express();

app.use('/views', express.static('views')); // permitir acesso estático a pasta

// ======= FUNCTIONS

const getViewPath = (view) => {
    return path.join(__dirname, `./views/${view}/${view}.html`);
}

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