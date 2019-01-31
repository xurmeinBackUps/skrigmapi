var router = require('express').Router();
var sequelize = require('../db');
var validate = require('../middleware/validate-session');
var Def= sequelize.import('../models/Def');



module.exports = router;