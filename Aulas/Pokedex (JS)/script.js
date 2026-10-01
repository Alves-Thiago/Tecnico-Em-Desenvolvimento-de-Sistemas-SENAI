const apiUrl = 'https://pokeapi.co/api/v2/'

const pokemonsContainer = document.getElementById("pokemonsContainer")
const loadMoreButton = document.getElementById("loadMore")

let page = 0
let limit = 9

async function getPokemons() {
    const res = await fetch(
        apiUrl + `pokemon/?offset=${page}&limit=${limit}`
    )

    const data = await res.json()

    for (let i = 0; i < data.results.length; i++) {
        await getPokemon(data.results[i].url)
    }

    page += limit
}

async function getPokemon(url) {
    const res = await fetch(url)
    const data = await res.json()

    const newPokemon = document.createElement("div")
    newPokemon.classList.add("pokemon")

    newPokemon.style.backgroundImage =
        `url(${data.sprites.front_default})`

    const name = document.createElement("div")
    name.classList.add("pokemon-name")
    name.innerText = data.name

    const number = document.createElement("div")
    number.classList.add("pokemon-number")
    number.innerText = `Número - 0${data.id}`

    const type = document.createElement("div")
    type.classList.add("pokemon-type")
    type.innerText = data.types[0].type.name

    newPokemon.appendChild(name)
    newPokemon.appendChild(number)
    newPokemon.appendChild(type)

    pokemonsContainer.appendChild(newPokemon)
}

loadMoreButton.addEventListener("click", () => {
    getPokemons()
})

getPokemons()
