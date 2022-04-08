let pokemonRepository = (function() {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        if (typeof(item) === 'object') {
            pokemonList.push(item);
        }
    }

    function find(item) {
        return pokemonList.filter(pokemon => pokemon.name === item);
    }

    function addListItem(pokemon) {
        let pokedex = document.querySelector('.pokemon-list');
        let dexEntry = document.createElement('li');
        let button = document.createElement('button');
        dexEntry.classList.add('group-list-item');
        button.addEventListener('click', function () {showDetails(pokemon)});
        button.innerText = pokemon.name;
        button.classList.add('button', 'btn', 'btn-secondary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#dexModal');
        dexEntry.appendChild(button);
        pokedex.appendChild(dexEntry);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            generateModal(pokemon);
        });
    }

    function generateModal(pokemon) {
        let entryTitle = document.querySelector('.modal-title');
        let entryBody = document.querySelector('.modal-body');
        let pokemonName = document.createElement('h3');
        pokemonName.innerText = pokemon.name;
        let pokemonImg = document.createElement('img');
        pokemonImg.setAttribute('src', pokemon.imageUrl);
        let dexNo = document.createElement('p');
        dexNo.innerText = 'Dex No: ' + pokemon.id;
        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + (Math.round(pokemon.height * 10) / 100) + ' m';
        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = 'Weight: ' + (Math.round(pokemon.weight * 10) / 100) + ' kg';

        //Clear Modal
        entryTitle.innerText = '';
        entryBody.innerText = '';
        
        //Add Pokedex Entry into Modal
        entryTitle.append(pokemonName);
        entryBody.append(pokemonImg);
        entryBody.append(dexNo);
        entryBody.append(pokemonHeight);
        entryBody.append(pokemonWeight);
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
            item.weight = details.weight;
            item.types = details.types;
            item.id = details.id;
        }).catch(function(e) {
            console.error(e);
        });
    }

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