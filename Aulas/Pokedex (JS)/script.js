const apiUrl = 'https://pokeapi.co/api/v2/';

const pokemonsContainer =
    document.getElementById("pokemonsContainer");

const loadMoreButton =
    document.getElementById("loadMore");

let page = 0;
let limit = 27;

const typeColors = {

    normal: "#A8A77A",

    fire: "#EE8130",

    water: "#6390F0",

    electric: "#F7D02C",

    grass: "#7AC74C",

    ice: "#96D9D6",

    fighting: "#C22E28",

    poison: "#A33EA1",

    ground: "#E2BF65",

    flying: "#A98FF3",

    psychic: "#F95587",

    bug: "#A6B91A",

    rock: "#B6A136",

    ghost: "#735797",

    dragon: "#6F35FC",

    dark: "#705746",

    steel: "#B7B7CE",

    fairy: "#D685AD"

};


async function getPokemons() {

    try {

        const res = await fetch(
            apiUrl +
            `pokemon/?offset=${page}&limit=${limit}`
        );

        const data = await res.json();

        for (let i = 0; i < data.results.length; i++) {

            await getPokemon(
                data.results[i].url
            );

        }

        page += limit;

    } catch (error) {

        console.error(
            "Erro ao buscar os Pokémon:",
            error
        );

    }
}


async function getPokemon(url) {

    try {

        const res = await fetch(url);

        const data = await res.json();

        const newPokemon =
            document.createElement("div");

        newPokemon.classList.add("pokemon");


        const types = data.types.map(
            pokemonType =>
                pokemonType.type.name
        );


        const color1 =
            typeColors[types[0]] || "#CCCCCC";


        let background;


        // Pokémon com apenas 1 tipo
        if (types.length === 1) {

            background = color1;

        }

        // Pokémon com 2 tipos
        else {

            const color2 =
                typeColors[types[1]] || "#CCCCCC";


            background =
                `linear-gradient(
                    128deg,
                    ${color1} 0%,
                    ${color1} 50%,
                    ${color2} 50%,
                    ${color2} 100%
                )`;

        }


        newPokemon.style.background =
            background;

        const name =
            document.createElement("div");

        name.classList.add(
            "pokemon-name"
        );

        name.innerText =
            data.name;

        const number =
            document.createElement("div");

        number.classList.add(
            "pokemon-number"
        );

        number.innerText =
            `Número - ${String(data.id).padStart(3, "0")}`;

        const image =
            document.createElement("img");

        image.classList.add(
            "pokemon-image"
        );

        image.src =
            data.sprites.front_default ||
            data.sprites.other?.["official-artwork"]?.front_default ||
            data.sprites.other?.home?.front_default ||
            "";

        image.alt =
            data.name;

        const type =
            document.createElement("div");

        type.classList.add(
            "pokemon-type"
        );

        type.innerText =
            types.join(" / ");

        newPokemon.appendChild(name);

        newPokemon.appendChild(number);

        newPokemon.appendChild(image);

        newPokemon.appendChild(type);

        pokemonsContainer.appendChild(
            newPokemon
        );


    } catch (error) {

        console.error(
            "Erro ao carregar Pokémon:",
            error
        );

    }

}

loadMoreButton.addEventListener(
    "click",
    () => {

        getPokemons();

    }
);

getPokemons();

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png