

const contenedorCatalogo = document.querySelector('.contenedor-productos');

  //Carga de productos desde el JSON

  let productosHtech = [];

  //Variable lista fav
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

  async function cargarProductos() {
    try{
        const res = await fetch('DATA/producto.json')
        productosHtech = await res.json(); //similar a JSON.parse()
        renderizarCatalogo(); 
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

            <button class="btn-favorito ${esFavorito ? 'active' : ''}" data-id="${producto.id}">
                        <span class="sr-only">${esFavorito ? 'en favoritos' : 'Agregar a favoritos'}</span>
                    </button>
            <button class="btn-agregar-carrito">Agregar al carrito</button>
            
        </article>
    `}).join('');
    contenedorCatalogo.innerHTML = catalogo;
}

//togle favoritos
function toggleFavorito(e) {
    const id = Number(e.target.dataset.id);
    if (favoritos.includes(id)) {
    favoritos = favoritos.filter(favID => favID !== id);
    e.target.classList.remove('active');
    e.target.textContent = 'Agregar a favoritos';
} else {
    favoritos.push(id);
    e.target.classList.add('active');
    e.target.textContent = 'en favoritos';

}
localStorage.setItem('favoritos', JSON.stringify(favoritos));
};


document.addEventListener('DOMContentLoaded', async() => {
   await cargarProductos();
});