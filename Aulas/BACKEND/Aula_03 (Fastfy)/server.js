import Fastify from 'fastify'

const app = Fastify( { logger: true } )

let tasks = [
    {id: 1, title: 'Estudar JS', date: '10-10-27', done: false},
    {id: 2, title: 'Estudar Inglês', date: '11-11-27', done: false},
    {id: 3, title: 'Comprar Arroz', date: '12-12-27', done: false}
]

// ROTA GET
app.get('/', async (request, response) => {
    return { mensagem: 'Acorda thiago!' }
})

// ROTA GET BY ID COM URL PARAMS
app.get('/animes/:id', async (request) => {
    return { id: request.params.id }
})

// ROTA GET COM URL QUERY
app.get('/animes', async (request) => {
    return { rating: request.query.rating }
})

// ROTA POST
app.post('/eco', async (request) => {
    return { eco: request.body }
})

app.listen({ port: 3000 }, (err, address) => {
    if(err) {
        app.log.error(err)
        process.exit(1)
    }

    console.log(`Servidor rodando em ${address}`)
})