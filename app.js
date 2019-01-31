require('dotenv').config();

var express = require('express');
var app = express();

var User = require('./controllers/usercontroller');
var Panel = require('./controllers/panelcontroller');
var Rref = require('./controllers/rrefcontroller');
var Def = require('./controllers/defcontroller');
var Rule = require('./controllers/rulecontroller');

var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync(); ///{force: true} to reset tables in DB

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
// app.use(require('./middleware/associations'));

app.use('/user', User);
app.use('/panels', Panel);
app.use('/rule_refs', Rref);
app.use('/defs', Def);
app.use('/rules', Rule);

app.listen(process.env.PORT, () => {
    console.log(`CONNECTED TO PORT ${process.env.PORT}`)
});

app.use('/database/server-test', function(req, res){
    res.send('SKRIGM GO! SKRIGM! SKRIGM! SKRIGM! SKRIGM! SKRIGM!')
});