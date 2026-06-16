

const contenedorCatalogo = document.querySelector('.contenedor-productos');

  //Carga de productos desde el JSON

  let productosHtech = [];

  //Variable lista fav
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []


//llamar a los elementos del DOM
const contenedotCatalogo = document.querySelector('.contenedor-catalogo');

//Construir la lista de favoritos
const ListaFavoritos = document.querySelector('.lista-favoritos');

//contruir contador de Favoritos
const favCount = document.querySelector('.fav-count');

//Carga produtos desde el .json
  async function cargarProductos() {
    try{
        const res = await fetch('DATA/producto.json')
        productosHtech = await res.json(); //similar a JSON.parse()
        renderizarCatalogo();
        renderizarFavoritos();
    }catch(error){
        console.error('error al cargar los productos', error);
    }
}

//renderizar catalogo

function renderizarCatalogo () {
    contenedorCatalogo.innerHTML = '';


const catalogo = productosHtech.map(producto =>{
    const esFavorito = favoritos.includes(producto.id);
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
            <button class="btn-agregar-carrito">Agregar al carrito</button>
            
        </article>
    `}).join('');
    contenedorCatalogo.innerHTML = catalogo;
}

contenedorCatalogo.addEventListener('click', (e) => {
    if (e.target.closest('.btn-AddFavorito')) {
        toggleFavorito(e);
    }
});

//togle favoritos
function toggleFavorito(e) {
    const id = Number(e.target.dataset.id);
    if (favoritos.includes(id)) {
    favoritos = favoritos.filter(favID => favID !== id);
    e.target.classList.remove('active');
     e.target.innetHTML ='<span class="sr-only">Agregar a Favoritos<span/>';
} else {
    favoritos.push(id);
    e.target.classList.add('active');
    e.target.innetHTML ='<span class="sr-only">En Favoritos<span/>';

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


document.addEventListener('DOMContentLoaded', async() => {
   await cargarProductos();
});