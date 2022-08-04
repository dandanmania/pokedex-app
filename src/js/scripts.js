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
        let filteredList = pokemonList.filter(pokemon => pokemon.name === item);
        console.log(filteredList);
        let query = item;
        let dexEntry = $('.dexEntry');
            dexEntry.each(function() {
                let item = $(this);
                let pokemonName = item.text();
                    if (pokemonName.includes(query)) {
                        item.show();
                    } else {
                        item.hide();
                    }
            })
    } 

    function pokemonSearch() {
        let pokedex = document.querySelector('.search-container');
        let searchBar = document.createElement('input');
        searchBar.classList.add('search-bar')
        searchBar.addEventListener('keyup', function () {find(searchBar.value.toLowerCase())})
        pokedex.appendChild(searchBar);
    }

    function addListItem(pokemon) {
        let pokedex = document.querySelector('.pokemon-list');
        let dexEntry = document.createElement('li');
        let button = document.createElement('button');
        let pokemonName = pokemon.name;
        dexEntry.classList.add('group-list-item', 'dexEntry');
        button.addEventListener('click', function () {showDetails(pokemon)});
        button.classList.add('button', 'btn', 'btn-secondary', 'btn-text');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#dexModal');
        dexEntry.appendChild(button);
        pokedex.appendChild(dexEntry);

        loadDetails(pokemon).then(function() {
            let spriteImg = document.createElement('img');
            spriteImg.src = pokemon.spriteUrl;
            spriteImg.classList.add('pokemon-sprite');
            button.append(spriteImg)
            button.append(pokemonName);
        });
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
        let pokemonType = document.createElement('p');
        let typeResult = pokemon.types.map(o => o.type.name).join(', ');
        pokemonType.innerText = 'Types: ' + typeResult;
        let pokemonAbilities = document.createElement('p');
        let abilitiesResult = pokemon.abilities.map(o => o.ability.name).join(', ');
        pokemonAbilities.innerText = 'Abilities: ' + abilitiesResult;

        //Clear Modal
        entryTitle.innerText = '';
        entryBody.innerText = '';
        
        //Add Pokedex Entry into Modal
        entryTitle.append(pokemonName);
        entryBody.append(pokemonImg);
        entryBody.append(dexNo);
        entryBody.append(pokemonHeight);
        entryBody.append(pokemonWeight);
        entryBody.append(pokemonType);
        entryBody.append(pokemonAbilities);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
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
            item.abilities = details.abilities;
            item.id = details.id;
            item.spriteUrl = details.sprites.versions['generation-vii'].icons.front_default;
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
        loadDetails,
        pokemonSearch,
    };
})();

function pokemonListAdd (pokemon) {
    pokemonRepository.addListItem(pokemon)
}

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemonListAdd);
    pokemonRepository.pokemonSearch();
});