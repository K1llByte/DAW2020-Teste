const express = require('express');
const axios = require('axios');

const router = express.Router();

// function verify_authorization(req, res, next)
// {
//     if(req.user.lvl == 1)
//     {
//         next();
//     }
//     else
//     {
//         req.status(403).jsonp({error:"Forbidden"});
//     }
// }

API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4MzYyOSwiZXhwIjoxNjExMDEyNDI5fQ.cb6ECaxgdfoCXohjdCph6gxvZTFqN4_SCzP6H4OQV6MvoVvUywhel6PPsZFKra-r9ycV2C8MI6JHWtxPjs_wIPydbbbznZb2Tx-oP37Pg4pVwhn0ds74wexRCF08FjBgeVdjoc_aYPMvFM3F9K0zn9AdM4mHu0O1tJUnQ9UIHZfX_GtxN1NZFmrjRZnd4ZOahbcKw1ODyh4u2ofs4H8eNc3IGwZUtWJaou7LZTrSNU27RnKv6D8f3lIYZJX7DT8XV2XRJwk561zxy_2qOZ7yz5uA1qO4_f54a4gyd2tYcMJMg7w-iCDJGb9lDi0gQgtVPQRB7Oq_INLuCpBxIKxLeA'
API_URL = 'http://clav-test.di.uminho.pt/v2'


// ========= ROUTES ========= //

// GET home page
router.get('/', (req, res, next) => {
    axios.get(`${API_URL}/tipologias/?token=${API_TOKEN}`)
    .then((api_res) => {
        // handle success''
        console.log('Successo',api_res.body);
        res.render('table', { "data" : api_res.data });
    })
    .catch((err) => {
        // handle error
        res.render('error',{ "err" : err });
    });
});


router.get('/tipologias/:id', (req, res, next) => {

    axios.get(`${API_URL}/tipologias/${req.params.id}?token=${API_TOKEN}`)
    .then((api_res1) => {
        // handle success''
        axios.get(`${API_URL}/tipologias/${req.params.id}/elementos?token=${API_TOKEN}`)
        .then((api_res2) => {

            axios.get(`${API_URL}/tipologias/${req.params.id}/intervencao/dono?token=${API_TOKEN}`)
            .then((api_res3) => {
                axios.get(`${API_URL}/tipologias/${req.params.id}/intervencao/participante?token=${API_TOKEN}`)
                .then((api_res4) => {
                    api_res1.data.id = req.params.id
                    res.render('tipo', { "tipologia" : api_res1.data , "entidades" : api_res2.data , "processos" : { "dono" : api_res3.data, "participante" : api_res4.data } });
                })
                .catch((err) => {
                    // handle error
                    res.render('error',{ "err" : err });
                });
            })
            .catch((err) => {
                // handle error
                res.render('error',{ "err" : err });
            });
        })
        .catch((err) => {
            // handle error
            res.render('error',{ "err" : err });
        });
    })
    .catch((err) => {
        // handle error
        res.render('error',{ "err" : err });
    });
});

module.exports = router;
