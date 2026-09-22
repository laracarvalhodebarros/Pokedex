const pokemonInput = document.getElementById("pokemonInput");
const buscarBtn = document.getElementById("buscarBtn");

const pokemonImagem = document.getElementById("pokemonImagem");
const pokemonNome = document.getElementById("pokemonNome");
const numeroPokemon = document.getElementById("numeroPokemon");
const pokemonTipos = document.getElementById("pokemonTipos");

const pokemonAltura = document.getElementById("pokemonAltura");
const pokemonPeso = document.getElementById("pokemonPeso");

const mensagem = document.getElementById("mensagem");

const anteriorBtn = document.getElementById("anteriorBtn");
const proximoBtn = document.getElementById("proximoBtn");
const aleatorioBtn = document.getElementById("aleatorioBtn");

let pokemonAtual = 1;

const quantidadePokemons = 1025;


async function buscarPokemon(pokemon) {

    mensagem.textContent = "Carregando...";

    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const dados = await resposta.json();

        pokemonAtual = dados.id;

        mostrarPokemon(dados);

        mensagem.textContent = "";

    } catch (erro) {

        mensagem.textContent = " Pokémon não encontrado.";

    }
}


function mostrarPokemon(pokemon) {

    pokemonNome.textContent = pokemon.name;

    numeroPokemon.textContent =
        `#${String(pokemon.id).padStart(3, "0")}`;

    pokemonImagem.src =
        pokemon.sprites.other["official-artwork"].front_default;

    pokemonImagem.alt =
        `Imagem do Pokémon ${pokemon.name}`;

    pokemonAltura.textContent =
        `${(pokemon.height / 10).toFixed(1).replace(".", ",")} m`;

    pokemonPeso.textContent =
        `${(pokemon.weight / 10).toFixed(1).replace(".", ",")} kg`;


  

    pokemonTipos.innerHTML = "";




    pokemon.types.forEach((tipoPokemon) => {

        const tipo = document.createElement("span");

        tipo.classList.add("tipo");

        tipo.textContent = tipoPokemon.type.name;

        pokemonTipos.appendChild(tipo);

    });
}



buscarBtn.addEventListener("click", () => {

    const busca = pokemonInput.value
        .trim()
        .toLowerCase();

    if (busca === "") {

        mensagem.textContent =
            "Digite o nome ou número de um Pokémon.";

        return;
    }

    buscarPokemon(busca);

});


pokemonInput.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {

        buscarBtn.click();

    }

});



anteriorBtn.addEventListener("click", () => {

    if (pokemonAtual > 1) {

        pokemonAtual--;

        buscarPokemon(pokemonAtual);

    }

});




proximoBtn.addEventListener("click", () => {

    if (pokemonAtual < quantidadePokemons) {

        pokemonAtual++;

        buscarPokemon(pokemonAtual);

    }

});




aleatorioBtn.addEventListener("click", () => {

    const numeroAleatorio =
        Math.floor(Math.random() * quantidadePokemons) + 1;

    buscarPokemon(numeroAleatorio);

});




buscarPokemon(1);
