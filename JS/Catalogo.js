

const contenedorCatalogo = document.querySelector('.contenedor-productos');

  //Carga de productos desde el JSON

  let productosHtech = [];

  //Variable lista fav
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];


//variable para los elementos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//llamar a los elementos del DOM
const contenedotCatalogo = document.querySelector('.contenedor-catalogo');

//Construir la lista de favoritos
const ListaFavoritos = document.querySelector('.lista-favoritos');

//contruir contador de Favoritos
const favCount = document.querySelector('.fav-count');

//para renderizar el carrito
const ListaCarrito = document.querySelector('.cart-lista');



// Contador para cuantos items hay en el carrito
const cartCount = document.querySelector('.cart-count');


// Mostrar el total de la compra
const cartTotal = document.querySelector('.cart-total');







//Carga produtos desde el .json
  async function cargarProductos() {
    try{
        const res = await fetch('DATA/producto.json')
        productosHtech = await res.json(); //similar a JSON.parse()
        renderizarCatalogo();
        renderizarFavoritos();
        renderizarCarrito();
    }catch(error){
        console.error('error al cargar los productos', error);
    }
}

//renderizar catalogo

function renderizarCatalogo () {
    contenedorCatalogo.innerHTML = '';


const catalogo = productosHtech.map(producto =>{
    const esFavorito = favoritos.includes(producto.id);
    const esCarrito = carrito.some(item => item.id === producto.id)
    return `
        <article class="card-producto">
            <div class="pagina"></div>
            <img src="${producto.img}" alt="${producto.titulo}">
            <h3>${producto.marca}</h3>
            <h2>${producto.titulo}</h2>
            <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>

            <button class="btn-AddFavorito ${esFavorito ? 'active' : ''}" data-id="${producto.id}">
                <span class="sr-only">${esFavorito ? 'en favoritos' : 'Agregar a favoritos'}</span>
            </button>
            
            <button class="btn-agregar-carrito ${esCarrito ? 'active' : ''}" data-id="${producto.id}">${esCarrito ? 'En carrito' : 'Agregar al carrito'}</button>
            
        </article>
        `;
    }).join('');
    
    contenedorCatalogo.innerHTML = catalogo;

    document.querySelectorAll('.btn-AddFavorito').forEach(btn => {
        btn.addEventListener('click', toggleFavorito);
    });

    document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });

}

contenedorCatalogo.addEventListener('click', (e) => {
    if (e.target.closest('.btn-AddFavorito')) {
        toggleFavorito({ target: btn });
    }
});





//togle favoritos
function toggleFavorito(e) {
    const id = Number(e.target.dataset.id);
    if (favoritos.includes(id)) {
    favoritos = favoritos.filter(favID => favID !== id);
    e.target.classList.remove('active');
     e.target.innerHTML ='<span class="sr-only">Agregar a Favoritos</span>';
} else {
    favoritos.push(id);
    e.target.classList.add('active');
    e.target.innerHTML ='<span class="sr-only">En Favoritos<span/>';

}
localStorage.setItem('favoritos', JSON.stringify(favoritos));
renderizarFavoritos();
};

//Renderizar favoritos
function renderizarFavoritos() {
    ListaFavoritos.innerHTML = '';

    if (favoritos.length === 0) {
    ListaFavoritos.innerHTML = '<p>No hay productos favoritos.</p>';

    favCount.textContent = 0;
    favCount.classList.remove('active');
    return;
} 
favoritos.forEach(id => {
    const prod = productosHtech.find(producto => producto.id === id);
    if (!prod) return;

    const li = document.createElement('li');
    li.className = 'item-fav';
    li.innerHTML = `
    <img src="${prod.img}" alt="portada del producto ${prod.titulo}">
    <span>${prod.titulo}</span>
    <button class="remove-item" data-id="${id}">
    <span class="sr-only">Eliminar de favoritos</span>
  </button>
`
ListaFavoritos.appendChild(li);
});

favCount.textContent = favoritos.length;
favCount.classList.add('active');
}

ListaFavoritos.addEventListener('click', (e) => {
const btn = e.target.closest('.remove-item');
if  (btn){
    const id = Number(btn.dataset.id);
    favoritos = favoritos.filter(favID => favID !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    renderizarFavoritos();
    renderizarCatalogo();
}
});

//Carrito----------------------------------------------------------------
//Agregar al carrito
function agregarAlCarrito(e) {
    const id = Number(e.target.dataset.id);
    const existe = carrito.find(item => item.id === id);

    if(existe){
        return;
    }else{
        carrito.push({id, cantidad: 1})
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCatalogo();
    renderizarCarrito();

};

//renderizar el carrito
function renderizarCarrito() {
    ListaCarrito.innerHTML = '';
    let total = 0;



    if (carrito.length === 0) {
        ListaCarrito.innerHTML =`
        <p>Tu carrito está vacío</p>
        `
        cartCount.textContent = 0;
        cartCount.classList.remove('active');
        return;
    }

    carrito.forEach(item => {
        const prod = productosHtech.find(producto => producto.id === item.id);
        if (!prod) return;

        const subtotal = prod.precio * item.cantidad;
        total += subtotal;

        const li = document.createElement('li');

        li.className = 'item-cart';
        li.innerHTML = `
        <img src="${prod.img}" alt="Portada del producto${prod.titulo}">
        <div>
        <h2>${prod.titulo}</h2>
        <h3>$${prod.precio.toLocaleString('es-AR')} x ${item.cantidad} = $${subtotal.toLocaleString('es-AR')}</h3>
    
        </div>

        <div class="cart-controles">
          <button class="menos" data-id="${item.id}">
          <span class="sr-only">Restar -1</span>
          </button>
          <span>${item.cantidad}</span>
          <button class="sumar" data-id="${item.id}">
          <span class="sr-only">Sumar +1</span>
          </button>
          <button class="eliminar" data-id="${item.id}">
          <span class="sr-only">Quitar item del carrito</span>
          </button>
        </div>
    

        `;
        ListaCarrito.appendChild(li);

    });

    cartTotal.innerHTML= 'Total de mi compra: ' + ' $' + total.toLocaleString('es-AR');
   
    cartCount.classList.add('active');
    cartCount.textContent = carrito.length;


    //listeeners para los botones de control


};


function modificarCantidad(id, delta){
const item = carrito.find(item => item.id === id);
if(item){
 item.cantidad = Math.max(1, item.cantidad + delta);
 renderizarCarrito();

};

};












document.addEventListener('DOMContentLoaded', async() => {
   await cargarProductos();
});