let pokemonList = [
    {name: 'Bulbasaur', pokedexNo: 1, height: 0.7, types: ['grass', 'poison']},
    {name: 'Charmander', pokedexNo: 4, height: 0.6, types: ['fire']},
    {name: 'Squirtle', pokedexNo: 7,height: 0.5, types: ['water']}
];

function pokemonListHeight(pokemon) {
    document.write(pokemon.name + ' (Height: ' + pokemon.height + ' m) ')
    if (pokemon.height > 0.6) {
        document.write('- Wow, that\'s big! <br>')
    }
    else {
        document.write('<br>')
    }
};

pokemonList.forEach(pokemonListHeight);