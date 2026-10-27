import http from 'http';

let pokemon = [
    { id: 1, name: "Bulbassauro", poder: 250 },
    { id: 2, name: "Charmander", poder: 350 },
    { id: 3, name: "Squirtle", poder: 300 },
]

async function getBody(req) {
    let body = ''
    for await (const chunk of req) body += chunk
    
    return body ? JSON.parse(body) : {}
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    const [, route, idStr] = req.url.split('/')

    if(route !== 'pokemon') {
        return res.writeHead(404).end(JSON.stringify({ erro: "Pokemon Pokemon Not Found" }))
    }

    // GET ALL
    if (req.method === 'GET' && !idStr) {
        res.writeHead(200)
        return res.end(JSON.stringify(pokemon))
    }

    // GET BY ID
    if (req.method === 'GET' && idStr) {
        const product = pokemon.find(p => p.id === Number(idStr))
        if(!product) {
            return res.writeHead(404).end(JSON.stringify({ erro: "Pokemon Not Found" }))
        }
        
        return res.writeHead(200).end(JSON.stringify(product))
    }

    // POST PRODUCT
    if (req.method === 'POST') {
        const body = await getBody(req)
        const newProduct = { id: Date.now(), ...body }
        pokemon.push(newProduct)

        return res.writeHead(201).end(JSON.stringify(newProduct))
    }

    // UPDATE PRODUCT PUT
    if (req.method === 'PUT' && idStr) {
        const body = await getBody(req)
        const index = pokemon.findIndex(p => p.id === Number(idStr))
        if (index === -1) {
            return res.writeHead(404).end(JSON.stringify({ erro: "Pokemon Not Found" }))
        }

        pokemon[index] = { ...pokemon[index], ...body }

        return res.writeHead(200).end(JSON.stringify(pokemon[index]))
    }

    // DELETE PRODUCT
    if (req.method === 'DELETE' && idStr) {
        pokemon = pokemon.filter(p => p.id !== Number(idStr))
        

        return res.writeHead(204).end(JSON.stringify({ sucess: "Pokemon successfully removed!" }))
    }
})

server.listen(3000, () => {
    console.log(`API rodando em http://localhost:${3000}`)
})