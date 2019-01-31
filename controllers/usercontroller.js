var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

var User = sequelize.import('../models/user');
var validate = require('../middleware/validate-session');

///////////////////////////////
//////////* CREATE *///////////
///////////////////////////////

router.post('/register', function(req, res){ 
    var Username = req.body.user.username;
    var passhash = req.body.user.password;

    User.create({
        username: Username,
        password: bcrypt.hashSync(passhash, 10),
    }).then(
        function createUser(user){
            var token = jwt.sign({id: user.id}, process.env.SIGN, {expiresIn: 60*60*24});
            res.json({
               username: user,
               message: 'Successfully registered!',
               sessionToken: token
            });
        },
        function createUserFail(){
            res.status(500).send({ error: '500 - Internal Server Error'})
        }
    );
});

router.post('/login', function(req, res){
    User.findOne({ 
        where:
        { username: req.body.user.username } 
    }).then(
        function(user){
            if(user){
            bcrypt.compare(req.body.user.password, user.password, 
                function(authMatch){
                    if(authMatch){
                        var token = jwt.sign({id: user.id}, process.env.SIGN, {expiresIn: 60*60*16});
                        res.json({
                           username: user,
                           message: `Welcome back ${user.username}`,
                           sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "502/Bad Gateway"})
                    }
                });
            } else {
                res.status(500).send({ error: "Have you registered yet?"})
            }
        },
        function(){
            res.status(501).send({ error: "Here be dragons--turn back! Also, get in touch with the idiot that made this site..." })
        }
    );
});


///////////////////////////////
///////////* READ *////////////
///////////////////////////////

router.get('/view_account/:id', validate, function(req, res){
    let data = req.params.id;
    let User = req.body.user;

    User.findOne({
        where: { id: data, user: User }
    }).then(
        function getOneSubUser(User){
            res.json(User)
        },
        function getOneSubUserFail(){
            res.status(500).send({error: '500 - Internal Service Error' })
        }
    );
});


///////////////////////////////
//////////* UPDATE *///////////
///////////////////////////////
        
router.put('/update/:id', validate, function(req, res){
    let data = req.params.id;
    let newUsername = req.body.user.username
    let newPassword = req.body.user.password
    
    User.update({
        username : newUsername,
        password : bcrypt.hashSync(newPassword, 10)
    }, { 
        where: {id: data} 
    }).then(
    function userUpdated(updateUser){
        res.json({
            message: 'Your account was updated!',
            username : updateUser
            });
        },
        function updateError(){
            res.status(500).send({error: '500 - Internal Server Error'});
        }
    );
});


///////////////////////////////
//////////* DELETE *///////////
///////////////////////////////
    
router.delete('/delete_account/:id', validate, function(req, res){
    let data = req.params.id;

    User.destroy({
        where: { id: data }
    }).then(
        function deleteUserSuccess(){
            res.send('What user?');
        },
        function deleteUserError(){
            res.status(500).send({error: '500 - Internal Server Error'});
        }
    );
});
    
module.exports = router;