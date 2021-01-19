const express = require('express');
const Movie = require('../controllers/movie');

const router = express.Router();

// ========= ROUTES ========= //

router.get('/api/filmes', (req, res, next) => {
    
    switch (req.query.by) 
    {
        case "ator":
            console.log("ator");
            Movie.list_by_actor()
                .then(docs => {
                    res.json(docs);
                })
                .catch(err => { 
                    console.log(err);
                });
            break;

        case "genero":
            Movie.list_by_genre()
                .then(docs => {
                    res.json(docs);
                })
                .catch(err => { 
                    console.log(err);
                });
            break;
    
        default:
            Movie.list_all()
                .then(data => {
                    res.json(data);
                })
                .catch(err => { 
                    console.log(err);
                });
            break;
    } 
});


router.get('/api/filmes/:id', (req, res, next) => {
    
    Movie.get(req.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            console.log(err);
        });
});


router.get('/api/atores', (req, res, next) => {
    
    Movie.list_actors()
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            console.log(err);
        });
});


router.get('/api/filmesQuantAtor', (req, res, next) => {
    
    Movie.list_qnt_actors()
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            console.log(err);
        });
});





module.exports = router;
