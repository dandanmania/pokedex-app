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
            //Makes Modal
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.innerHTML = '';
            let modal = document.createElement('div');
            modal.classList.add('modal');

            //Makes Close Button
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = "Close";
            closeButtonElement.addEventListener('click', hideDetails);
    
            //Makes Content in Modal
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;
            let imageElement = document.createElement('img');
            imageElement.src = pokemon.imageUrl;
            let contentElement = document.createElement('p');
            contentElement.innerText = 'Height: ' + pokemon.height;
    
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(imageElement);
            modal.appendChild(contentElement);
            modalContainer.appendChild(modal);
            modalContainer.classList.add('is-visible')
        });
    }

    function hideDetails() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
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

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideDetails();
        }
    });

    window.addEventListener('click', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        let target = e.target;
        if (target === modalContainer) {
            hideDetails();
        }
    })

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