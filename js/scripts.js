let pokemonList = [
    {name: 'Bulbasaur', pokedexNo: 1, height: 0.7, types: ['grass', 'poison']},
    {name: 'Charmander', pokedexNo: 4, height: 0.6, types: ['fire']},
    {name: 'Squirtle', pokedexNo: 7,height: 0.5, types: ['water']}
];

for (i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ' m) ')
    if (pokemonList[i].height > 0.6) {
        document.write('- Wow, that\'s big! <br>')
    }
    else {
        document.write('<br>')
    }
}