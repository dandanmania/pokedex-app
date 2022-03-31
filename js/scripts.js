let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', pokedexNo: 1, height: 0.7, types: ['grass', 'poison']},
        {name: 'Charmander', pokedexNo: 4, height: 0.6, types: ['fire']},
        {name: 'Squirtle', pokedexNo: 7,height: 0.5, types: ['water']}
    ];

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        if (typeof(item) === 'object' && Object.keys(item).join() === Object.keys(pokemonList[1]).join()) {
            pokemonList.push(item);
        }
    }

    function find(item) {
        return pokemonList.filter(pokemon => pokemon.name === item);
    }

    function addListItem(pokemon) {
        let pokedex = document.querySelector('ul');
        let dexEntry = document.createElement('li');
        let button = document.createElement('button');
        button.addEventListener('click', function () {showDetails(pokemon)})
        button.innerText = pokemon.name;
        button.classList.add('button');
        dexEntry.appendChild(button);
        pokedex.appendChild(dexEntry);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name)
    }

    return {
        add,
        getAll,
        find,
        addListItem,
        showDetails
    };
})();

function pokemonListHeight(pokemon) {
    pokemonRepository.addListItem(pokemon)
};

pokemonRepository.getAll().forEach(pokemonListHeight);
