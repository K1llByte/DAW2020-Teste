const express = require('express');
const Baptism = require('../controllers/baptism');

const router = express.Router();

// ========= ROUTES ========= //



router.get('/api/batismos/stats', (req, res, next) => {
    
    Baptism.list_stats()
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            console.log(err);
        });
});

router.get('/api/batismos/progenitores', (req, res, next) => {
    
    Baptism.list_parents()
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            console.log(err);
        });
});

router.get('/api/batismos/batisado', (req, res, next) => {
    Baptism.list_titles()
        .then(data => {
            var result = [];
            data.forEach(e => {
                // var tmp = e.title.replace(/Registo de batismo n\.º [0-9]+: ([^.])\. Pai:/,'\1');
                // console.log(tmp);
                // e.title.replace(/Registo de batismo n\.º [0-9]+: ([^.])\. Pai:/,'\1')
                
                result.push( e.title.split(':')[1].split('.')[0].substring(1) );
            });
            result.sort()
            res.json(result);
        })
        .catch(err => { 
            console.log(err);
        });
});


router.get('/api/batismos', (req, res, next) => {
    
    if (req.query.ano != undefined)
    {
        Baptism.list_from_year(req.query.ano)
        .then(docs => {
            res.json(docs);
        })
        .catch(err => { 
            console.log(err);
        });
    }
    else
    {
        Baptism.list_all()
            .then(docs => {
                res.json(docs);
            })
            .catch(err => { 
                console.log(err);
            });
    }
});


router.get('/api/batismos/:id', (req, res, next) => {
    Baptism.get(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            console.log(err);
        });
});






// router.get('/api/batismos/stats', (req, res, next) => {
    
//     Movie.list_qnt_actors()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => { 
//             console.log(err);
//         });
// });


// GET /api/batismos - Devolve a lista dos batismos, com os campos: _id, date, title e ref;
// GET /api/batismos/:id - Devolve a informação completa de um batismo;
// GET /api/batismos/batisado - Devolve apenas uma lista com os nomes dos indivíduos batizados ordenada alfabeticamente;
// GET /api/batismos/progenitores - Devolve uma lista de triplos em que cada triplo tem a seguinte estrutura: {_id: "identificador do registo original", pai: "nome do pai do indivíduo que foi batizado", mae: "nome da mae do indivíduo que foi batizado"}; Esta alínea poderá ser resolvida de várias maneira e irá depender da forma como resolveste as primeiras.
// GET /api/batismos?ano=YYYY - Devolve a lista de batismos realizados no ano YYYY;
// GET /api/batismos/stats - Devolve uma lista de pares, ano e número de batismos nesse ano.



module.exports = router;
