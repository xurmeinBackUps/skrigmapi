require('dotenv').config();

var express = require('express');
var app = express();

var User = require('./controllers/usercontroller');
var Def = require('./controllers/defcontroller');
var Rule = require('./controllers/rulecontroller');
var Rref = require('./controllers/rrefcontroller');
var Panel = require('./controllers/panelcontroller');

var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync(); ///{force: true} to reset tables in DB

app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/database/server-test', function(req, res){
    res.send('SKRIGM GO! SKRIGM! SKRIGM! SKRIGM! SKRIGM! SKRIGM!')
})

app.use('/user', User);

app.use(require('./middleware/validate-session'))

app.use('/defs', Def);
app.use('/rules', Rule);
app.use('/rule_refs', Rref);
app.use('/panels', Panel);



app.listen(process.env.PORT, () => {
    console.log(`CONNECTED TO PORT ${process.env.PORT}`)
});