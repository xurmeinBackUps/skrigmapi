var sequelize = require('../db');

const User = sequelize.import('../models/User');
const Panel = sequelize.import('../models/Panel');
const Rref = sequelize.import('../models/Rref');
const Rule = sequelize.import('../models/Rule');
const Def = sequelize.import('../models/Def');

// let models = [
//     { User: ser },
//     { Panel: anel },
//     { Rref: ref }, 
//     { Rule: ule },
//     { Def: ef } 
// ];

module.exports = function() {
    User.hasMany(Panel, {
        as: 'screens',
    })

}
/* 
notes to self:
#############
1)define additional tables for storing association info based on the models here, use 'this'
2)follow sequelize docs re: associations in the module.expoerts = function(???){ blah }
3)figure out what ??? param is
4)maybe do multiple "module.exports = function()"; one per model ????
*/