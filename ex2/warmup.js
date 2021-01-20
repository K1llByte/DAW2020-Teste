#!/bin/node

const axios = require('axios');

API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDgxMGM2NDFhYmQ1NDU0MDZkZmRkMSIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJkYXcyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMTE1MzE0MCwiZXhwIjoxNjExMTgxOTQwfQ.HNOtgiNDGwtYsSBLz99JFe7yb8m1gT5B0rTBsDoFJnWK3DssuqXiL-T-uZ-YiArjBc7VdvlPypaLUdtOHq8MFiBEdxDCX0y-CgDnr7Y8o223cKrK8NKz-G7Ub8eMrvDule-7l20bf3S-5KDl1jeYV11v1Js_9MaCGKMKg-vpL5Pje2l5-1w_ZX6AOQ8WI3ER5yZ90NA8vODNesmMOX5a6ktEc1CJxXoD5k6N2cc3H5X_8aG0FZA-Kx8_Z53DPoQNSWPpazuwWuUiY-mhtYV6q82lCuNGHvitQmLPMe6_3W52YfMhRvQPpK_igy-oJTQjXvqaIVTKfYwvEhRY9izn3Q'
API_URL = 'http://clav-api.di.uminho.pt/v2'

// ========= FETCH TOKEN ========= //


//1. Quantos processos (nível 3) e quais são (obtem uma lista em JSON; podes concatenar sublistas invocando várias queries), pertencentes à descendência da classe 900?
//2. Quantas entidades estão catalogadas?
//3. Quantos processos (classes de nível 3) se encontram na descendência de 900.10?
//4. Quantos processos (classes de nível 3) estão relacionados com 900.10.505?

// 1.
http://clav-api.di.uminho.pt/v2
axios.get(`${API_URL}/classes/c900/descendencia?nivel=3&estrutura=lista&token=${API_TOKEN}`)
.then((api_res) => {
    console.log('1. num desc c900 =',api_res.data.length);
    console.log("1. Codigos dos processos:")
    api_res.data.forEach(e => {
        console.log("- ",e.codigo);
    });
    
})
.catch((err) => {
    // handle error
    console.log(err);
});


// 2.
axios.get(`${API_URL}/entidades?token=${API_TOKEN}`)
.then((api_res) => {
    // handle success''
    console.log('2. num entidades =',api_res.data.length);
})
.catch((err) => {
    // handle error
    console.log(err);
});



// 3.
axios.get(`${API_URL}/classes/c900.10/descendencia?nivel=3&estrutura=lista&token=${API_TOKEN}`)
.then((api_res) => {
    // handle success''
    console.log('3. num desc c900.10 =',api_res.data.length);
})
.catch((err) => {
    // handle error
    console.log(err);
});


// 4.
axios.get(`${API_URL}/classes/c900.10.505/procRel?nivel=3&estrutura=lista&token=${API_TOKEN}`)
.then((api_res) => {
    // handle success''
    console.log('4. num procRel c900.10.505 =',api_res.data.length);
})
.catch((err) => {
    // handle error
    console.log(err);
});