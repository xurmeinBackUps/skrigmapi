var router = require('express').Router();
var sequelize = require('../db');
var validate = require('../middleware/validate-session');
var Rref= sequelize.import('../models/Rref');

///////////////////////////////
//////////* CREATE *///////////
///////////////////////////////

router.post('/new', validate, function(req, res){
    let GMid = req.user.id;
    let Topic = req.body.rref.topic;

    Rref.create({
        topic: Topic
    }, { 
        where: { id: GMid }
    }).then(
        function newRref(rref_id){
            res.json({
                message : 'You created new refernce for your panels!',
                rref : rref_id,
                topic : Topic
            });
        },
        function createRefFail(err){
            res.status(500).send(err)
        }
    );
});


///////////////////////////////
///////////* READ *////////////
///////////////////////////////

router.get('/myrrefs', validate, function(req, res){            
    let GMid = req.user.id;

    Rref.findAll({
        where: {id : GMid}
    }).then(
        function getAllPanels(data){
            res.json(data)
        },
        function getPanelsFail(err){
            res.status(500).send(err)
        }
    );
});

router.get('/:id', validate, function(req, res){
    let rref_data = req.params.id;
    let GMid = req.user.username;
    let Topic = res.body.panel.topic;

    Rref.findOne({
        where: { 
            id : rref_data,
            username : GMid 
        } 
    }).then(
        function foundOneRref(data){
            res.json({
                message: 'Your requested screen panel',
                panel_id: data,
                topic : Topic
            });
        },
        function findNoRref(err){
            res.status(500).send(err)
        }
    )
})


///////////////////////////////
//////////* UPDATE *///////////
///////////////////////////////

router.put('/update/:id', validate, function(req, res){
    let rref_data = req.params.id;
    let Title = req.body.panel.title;
    let GMid = req.user.username;
   

    Rref.update({
        title : Title,
    }, {where: {id : rref_data, username : GMid }}
    ).then(
        function topicUpdate(Topic){
            res.json({
                message : "Panel's title changed!",
                title: Topic
            });
        },
        function catUpdateFail(err){
            res.status(500).send(err)
        }
    );
});


///////////////////////////////
//////////* DELETE *///////////
///////////////////////////////

router.delete('/delete/:id', validate, function(req, res){
    let rref_data = req.params.id;
    let GMid = req.user.username;

    Rref.destroy({
        where: {id : rref_data, username : GMid}
    }).then(
        function euthenizeCat(data){
            res.json({
                message: `Deleted: ${data}`
            });
        },
        function stillLivingCat(err){
            res.status(500).send(err);
        }
    );
});


module.exports = router;