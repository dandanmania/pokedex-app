let pokemonRepository = (function() {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        if (typeof(item) === 'object' /*&& Object.keys(item).join() === Object.keys(pokemonList[1]).join()*/) {
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
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails (item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    };

    return {
        add,
        getAll,
        find,
        addListItem,
        showDetails,
        loadList,
        loadDetails
    };
})();

function pokemonListAdd (pokemon) {
    pokemonRepository.addListItem(pokemon)
}

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemonListAdd);
});
