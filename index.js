const { request } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/conectDatabase');
const Question = require('./database/Question');
const Response = require('./database/response');
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

/**
 * página index
 */
app.get('/', (request, response) => {

    Question.findAll({
        raw: true, order: [
            [
                'id', 'DESC'
            ]
        ]
    }).then((questions) => {
        response.render('index', {
            questions: questions
        });
    })
});

/**
 * busca todas as questões
 */
app.get('/questions', (request, response) => {
    response.render('questions');
});

/**
 * busca a questão pelo id
 */
app.get('/question/:id', (request, response) => {

    Question.findOne({
        where: {
            id: request.params.id
        }
    }).then(question => {
        if (question) {
            Response.findAll({
                where: { questionsId: request.params.id }
            }).then(responses => {
                response.render('single-question', {
                    question: question,
                    responses: responses
                });
            })

        } else {
            response.redirect('/');
        }
    });
})

app.post('/response', (request, response) => {
    Response.create({
        description: request.body.response,
        questionsId: request.body.responseId
    }).then(() => {
        response.redirect(`/question/${request.body.responseId}`);
    });
})


app.post('/send_reply', (request, response) => {

    Question.create({
        title: request.body.title,
        description: request.body.description
    }).then(() => {
        response.redirect('/');
    })
})

app.listen('8001', () => {
    console.log("Servidor rodando...");
})