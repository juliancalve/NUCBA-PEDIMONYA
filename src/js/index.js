let myCart = [];

const pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?limit=9';
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
const cartList = document.getElementById('cart-list');
const submitButton = document.getElementById('onSubmit');

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

            const pokemon = myCart.find(pokemon => pokemon.id === id);
            if(pokemon) {
                const index = myCart.indexOf(pokemon);
                pokemon.quantity++;
                myCart[index] = pokemon;
            } else {
                const pokemonToCart = {
                    img: img.src,
                    name: poke.name,
                    price,
                    id,
                    quantity: 1
                };

                myCart.push(pokemonToCart);
            }
            renderCartProducts();
            showTotalAmount();
        });
        productsContainer.appendChild(li);
    });
}

const showTotalAmount = () => {

    let total = 0;
    myCart.forEach(cart => {
        console.log(cart);
        total += (cart.price * cart.quantity);
    });

    totalAmount.innerText = `$ ${total}`;
}
/*
1-  <div class="cart-item">
2-      <div class="cart-item-content">
3-          <div class="item-img">
4-              <img src="./assets/img/squirtle.png" alt="Squirtle">
            </div>
5-          <span>- Coso de vamo a calmarno</span>
        </div>
6-    <span>$758</span>
    </div>

*/
const renderCartProducts = () => {
    cartList.innerHTML = null;
    myCart.forEach(product => {

        //Estoy creando el 1-div donde va a ir todo el contenido de cada producto
        const container = document.createElement('div');
        container.className = 'cart-item';

        //Estoy creando el 2-div donde va la img y el nombre
        const cartItemContent = document.createElement('div');
        cartItemContent.className = 'cart-item-content';

        //Estoy creando el 3-div que contiene la img
        const itemImg = document.createElement('div');
        itemImg.className = 'item-img';
        itemImg.style.marginRight = '30px';

        //Estoy creando el 4-img que tiene el src del objeto que tiene myCart que estamos iterando ahora
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.style.width = '100px';

        //Estoy metiendo el 4 en el 3
        itemImg.appendChild(img);

        //Estoy metiendo el 3 en el 2
        cartItemContent.appendChild(itemImg);

        //Estoy creando el 5 que lleva el nombre del producto
        const itemName = document.createElement('span');
        itemName.innerText = `- ${product.name}`;

        //Creo la cantidad
        const itemQuantity = document.createElement('b');
        itemQuantity.innerText = `X ${product.quantity}`;
        itemQuantity.style.marginLeft = '80px';

        //Meto el name y el quantity en otro div para que queden con el mismo espacio
        const nameAndQuantity = document.createElement('div');
        nameAndQuantity.appendChild(itemQuantity);
        nameAndQuantity.appendChild(itemName);
        
        cartItemContent.appendChild(nameAndQuantity);
        //Estoy creando el 6 donde lleva el precio del producto
        const itemPrice = document.createElement('span');
        itemPrice.innerText = `$ ${product.price}`;

        //Estoy metiendo el 2 en el 1 (es el contenedor que tiene el contenedor de la img y el nombre)
        container.appendChild(cartItemContent);

        //Estoy metiendo el 6 en el 1
        container.appendChild(itemPrice);
        
        //Estoy metiendo el 1 en el cart
        cartList.appendChild(container);

    });
}

submitButton.addEventListener('click', () => {

    cartList.innerHTML = null;
    myCart = [];
    showTotalAmount();
    alert('Gracias por comprar en Pedimon');
});

getPokemons();
