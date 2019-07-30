// ============ EXTERNAL IMPORTS
const express = require ('express');
const bcrypt = require('bcrypt');

// ============ INTERNAL IMPORTS
const db = require('../providers/firebase');
const handleError = require('../providers/handle-error');

//criando o app express
const app = express();

// ============ models 
// ------------ USER
const User = db.ref(`${process.env.FIREBASE_ACCESS_TOKEN}/user`);

// ------------

// ============ /REGISTER
app.post('/register', async (req, res) => {
    try {
        // Missing data Err
        if(
               !req.body.username
            || !req.body.password
            || !req.body.password2
            || !req.body.alias
        ){
            handleError(res, null, 'missing-data!');
            return;
        }

        // PW dont check
        if(req.body.password !== req.body.password2){
            handleError(res, null, 'password-dont-match');
            return;
        }

        //check db for user
        const checkUser = (
            await User
                .orderByChild('username')
                .equalTo(req.body.username)
                .once('value')
            )
            .val();

        // duplicated user err
        if(checkUser){
            handleError(res, null, 'user-already-exists');
            return;
        }

        // Creating hash for user pw
        const hash = await bcrypt.hash(req.body.password, 10);
        
        await User.push({
            username: req.body.username,
            password: hash,
            alias: req.body.alias,
        })

        //TODO: 
        res.send('ok');
        
    } catch (err) {
       handleError(res, err, null); 
    } 
});

// ============ /LOGIN
app.post('/login', async (req, res)=>
{
    try {
        //missing data on login
        if(!req.body.username|| !req.body.password){
            handleError(res, null, 'missing-data');
            return;
        }

        //user not found
        const user = (
            await User
                .orderByChild('username')
                .equalTo(req.body.username)
                .once('value')
        ).val();

        // duplicated user error
        if(!user){
            handleError(res, null, 'user-not-found');
            return;
        }

        const [ userID, userData ] = Object.entries(user)[0];
        
        // console.log(`
        //     username: ${userData.username}
        //     alias: ${userData.alias}
        //     userID: ${userID}
        //     password: ${userData.password}
        // `);

        //check password
        const match = await bcrypt.compare(req.body.password, userData.password);
        if(!match){
            handleError(res, null, 'wrong-password');
            return;
        }

        if (match){
            //creating session for user with userID;
            req.session.userID = userID;
            
            //sendo response
            res.send('OK!');
            return;
        }
    } catch (error) {
        handleError(res, err, null);
    }
});

// ============ /CONTACT
app.post('/contact:contact' ,async (req, res) => {
    try {
        const contact = (
            await User
                .orderByChild('username')
                .equalTo(req.params.contact)
                .once('value')
        ).val();

        if(!contact){
            handleError(res, null, 'contact-not-found');
            return;
        }

        const [ contactID, contactData ] = Object.entries(contact)[0];

        //Add contact to a user
        User.child(req.session.userID).child('contacts').push(
        {
            alias: contactData.alias,
            id: contactID,
        });
    } catch (error) {
        
    }
});

// ============ exports
module.exports = app; 