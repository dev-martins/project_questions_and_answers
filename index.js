const { request } = require('express');
const express = require('express');
const app = express();

/**
 * Informando ao Express que deve utilizar
 * o motor HTML EJS
 */
app.set('view engine','ejs');

/**
 * carregando arquivos staticos
 */
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index');
});

app.listen('8001', () => {
    console.log("Servidor rodando...");
})