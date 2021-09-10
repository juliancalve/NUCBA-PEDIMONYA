const myCart = [];

const pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?limit=500';
const imgURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
/*
<li>
<div>
<img src="./assets/img/takara.png" alt="Balbasaur">
</div>
<span>El legendario <br> Articuno</span>
<span>125$</span>
<button>Comprar</button>
</li>
*/
const totalAmount = document.getElementById('totalAmount');
const productsContainer = document.getElementById('products-container');

const getPokemons = async () => {
    try {

        const response = await fetch(pokemonsURL, {
            method: 'GET'
        });

        const json = await response.json();
        const { results } = json;
        renderPokemons(results);
    } catch( error ) {
        alert(error);
    }
};

const renderPokemons = (pokemons) => {
    pokemons.forEach(poke => {
        const li = document.createElement('li');
        const div = document.createElement('div');

        const arr = poke.url.split('/');
        console.log(arr);
        const id = arr[arr.length-2];
        const img = document.createElement('img');
        img.src = `${imgURL}${id}.png`;
        img.alt = poke.name;

        div.appendChild(img);

        const spanTitle = document.createElement('span');
        spanTitle.innerText = poke.name;

        const spanPrice = document.createElement('span');
        const price = Math.floor(Math.random() * 1500) + 450
        spanPrice.innerText = `$ ${price}`

        const button = document.createElement('button');
        button.innerText = 'Comprar';

        li.appendChild(div);
        li.appendChild(spanTitle);
        li.appendChild(spanPrice);
        li.appendChild(button);
        button.addEventListener('click', () => {
            const pokemonToCart = {
                img: img.src,
                name: poke.name,
                price
            }

            myCart.push(pokemonToCart);
            showTotalAmount();
        });

        productsContainer.appendChild(li);
    });
}

const showTotalAmount = () => {

    let total = 0;
    myCart.forEach(cart => {
        console.log(cart);
        total += cart.price;
    });

    totalAmount.innerText = `$ ${total}`;
}

getPokemons();
