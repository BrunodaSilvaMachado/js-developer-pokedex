const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
// Get the modal
const modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const modalClose = ()=>{modal.style.display = "none";}
// When the user clicks on <span> (x), close the modal
span.onclick = ()=>modalClose();
// Get elements from modal
const number = document.getElementById('number');
const pkName = document.getElementById('name');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const modalPokemonImg = document.getElementById('modalPokemonImg');
const olTypes = document.getElementById('olTypes');
const olWeakness = document.getElementById('olWeakness');
const olAbilities = document.getElementById('olAbilities');
const modalPokemon = document.getElementById('modalPokemon');
//tab contents
const aboutDetails = document.getElementById('aboutDetails');
const olMoves = document.getElementById('olMoves');
const pokemonHp = document.getElementById('pokemonHp');
const pokemonAtk = document.getElementById('pokemonAtk');
const pokemonDef = document.getElementById('pokemonDef');
const pokemonSatk = document.getElementById('pokemonSatk');
const pokemonSdef = document.getElementById('pokemonSdef');
const pokemonSpd = document.getElementById('pokemonSpd');
//

window.onclick = function(event) {
    if (event.target == modal) {
      modalClose();
    }
  }
const maxRecords = 151
const limit = 10
let offset = 0;

function modalDisplay(id){
    modal.style.display = "block";
    const dataPokemon = document.getElementById(id).getAttribute('data-pokemon');
    const pokemon = JSON.parse(dataPokemon);
    //
    modalPokemon.className = "";
    modalPokemon.classList.add("pokemon");
    modalPokemon.classList.add(pokemon.type);
    number.innerHTML = pokemon.number;
    pkName.innerHTML = pokemon.name;
    height.innerHTML = pokemon.height;
    weight.innerHTML = pokemon.weight;
    olTypes.innerHTML = `${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}`;
    olWeakness.innerHTML = `${pokemon.weakness.map((weak) => `<li class="type ${pokemon.type}">${weak}</li>`).join('')}`;
    olAbilities.innerHTML = `${pokemon.abilities.map((ability) => `<li class="type ${pokemon.type}">${ability}</li>`).join('')}`;
    modalPokemonImg.innerHTML = `<img src="${pokemon.photo}" alt="${pokemon.name}">`;
    aboutDetails.innerHTML = `${pokemon.about}`;
    pokemonHp.innerHTML = statusBar(pokemon.hp)  
    pokemonAtk.innerHTML = statusBar(pokemon.atk);
    pokemonDef.innerHTML = statusBar(pokemon.def);
    pokemonSatk.innerHTML = statusBar(pokemon.satk);
    pokemonSdef.innerHTML = statusBar(pokemon.sdef);
    pokemonSpd.innerHTML = statusBar(pokemon.satk);
    olMoves.innerHTML = `${pokemon.moves.map((move)=> `<li class="type ${pokemon.type}">${move}</li>`).join('')}`;
}

function statusBar(value) { 
    const nValue = Math.round(value/252 * 100);
    return `
    <div class="progress">
        <div class="progress-bar" style="width:${nValue}%;">${value}</div>
    </div>
    `
 }

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.number}" class="pokemon ${pokemon.type}" data-toggle="modal" data-target="#myModal" 
        data-pokemon='${JSON.stringify(pokemon)}' onClick="modalDisplay(${pokemon.number});">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})