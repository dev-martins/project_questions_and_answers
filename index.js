const { request } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/conectDatabase');

/**
 * configurando a conexão com o banco de dados
 */

connection.authenticate()
    .then(() => {
        console.log('Conexão realizada com sucesso');
    })
    .catch((erro) => {
        console.log(erro);
    })

/**
 * Informando ao Express que deve utilizar
 * o motor HTML EJS
 */
app.set('view engine', 'ejs');

/**
 * carregando arquivos staticos
 */
app.use(express.static('public'));

/**
 * usando o body-parser para analisar 
 * o corpo das requisições
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/questions', (request, response) => {
    response.render('questions');
});

app.post('/send_reply', (request, response) => {
    let description = request.body.description;
    response.send(`Descrição da pergunta: <strong>${description}</strong>`);
})

app.listen('8001', () => {
    console.log("Servidor rodando...");
})