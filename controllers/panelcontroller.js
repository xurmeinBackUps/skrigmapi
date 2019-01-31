var router = require('express').Router();
var sequelize = require('../db');
var Panel = sequelize.import('../models/Panel');


///////////////////////////////
//////////* CREATE *///////////
///////////////////////////////

router.post('/new', function(req, res){
    let GMid = req.user.id;
    let Title = req.body.panel.title;

    Panel.create({
        title: Title
    }, { 
        where: { id: GMid }
    }).then(
        function newPanel(panel){
            res.json({
                message : 'You created new panel for you GM screen!',
                title : Title
            });
        },
        function createCatFail(err){
            res.status(500).send(err)
        }
    );
});


///////////////////////////////
///////////* READ *////////////
///////////////////////////////

router.get('/mypanels', function(req, res){            
    let GMid = req.user.id;

    Panel.findAll({
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

router.get('/:id', function(req, res){
    let data = req.params.panel_id;
    let GMid = req.user.id;
    let Title = res.body.panel.title;

    Category.findOne({
        where: { 
            panel_id : data,
            id : GMid 
        } 
    }).then(
        function foundOneCat(data){
            res.json({
                message: 'Your requested screen panel',
                panel_id: data,
                title : Title
            });
        },
        function findNoCat(err){
            res.status(500).send(err)
        }
    )
})


///////////////////////////////
//////////* UPDATE *///////////
///////////////////////////////

router.put('/update/:id', function(req, res){
    let data = req.params.panel_id;
    let Title = req.body.panel.title;
    let GMid = req.user.id
   

    Panel.update({
        title : Title,
    }, {where: {panel_id : data, id : GMid }}
    ).then(
        function titleUpdate(updatedTitle){
            res.json({
                message : "Panel's title changed!",
                title: updatedTitle
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

router.delete('/delete/:id', function(req, res){
    let data = req.params.panel_id;
    let GMid = req.user.id;

    Category.destroy({
        where: {panel_id : data, id : GMid}
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