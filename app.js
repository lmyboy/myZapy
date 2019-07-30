// myZapy

// ============ EXTERNAL IMPORTS
// ------------ express
const express = require('express');
const app = express();

// ------------ express-session
const session = require('express-session');

// ------------ path
const path = require('path');

// ------------ .env
const dotenv = require('dotenv');

// ------------ bodyParser
const bodyParser = require('body-parser');

//===== INTERNAL IMPORTS
const hadleError = require('./providers/handle-error');

//===== MIDDLEWERE

dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const sess = {
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: {}
};

app.use(session(sess));

app.use('/views', express.static('views')); // permitir acesso estático a pasta views

// ======= FUNCTIONS

const getViewPath = (view) => {
    return path.join(__dirname, `./views/${view}/${view}.html`);
}

// ============ USER ROUTES
app.use('/api/user', require('./routes/user'));

// ============ VIEWS
// ------------ OTHERS
app.get('/:view', (req, res) => {
    res.sendFile(getViewPath(req.params.view), err => {
        if(err){
            res.send('404');
        }
    });
})

// ============ ACESS CONTROL

app.use((req, res, next)=>{
    if (!req.session.userID) {
        if (req.url.indexOf('api') !== -1) {
            hadleError(res,null, 'unauthenticated');
            return;
        }
        res.redirect('/login');
        return;
    };
    next();
});

// ------------ HOME
app.get('/', (req, res)=> {
    //print session
    console.log(req.session.userID);

    //send home
    res.sendFile(getViewPath('home'));
});

app.use('/api/message', require('./routes/message'));

// ============ Server run
const port = 80;

app.listen(port, ()=> {
    console.log('Rôdando!\n');
});