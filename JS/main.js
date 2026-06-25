

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





//cargar datos desde AIRTABLE
const AIRTABLE_BASE_ID = 'appuplWoRdAqZs068';//url
const AIRTABLE_PAT = 'patMqJd26dJX08cMS.4aa35c8de7427e5fc85b872675233d76421c3a2fec5c4341770881c02008952c';//token

async function cargarProductos() {
    try{
        const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/productos?sort[0][field]=id&sort[0][direction]=asc`, {
            headers: {Authorization: `Bearer ${AIRTABLE_PAT}`}
            });
        
        const data = await res.json();   
        productosHtech = data.records.map(r => r.fields);


        renderizarCatalogo();
        renderizarFavoritos();
        renderizarCarrito();
    }catch(error){
        console.error('error al cargar los productos', error);
    };
}

//renderizar catalogo

function renderizarCatalogo () {
    if(!contenedorCatalogo) return;
    contenedorCatalogo.innerHTML = '';


const catalogo = productosHtech.map(producto =>{
    const esFavorito = favoritos.includes(producto.id);
    const esCarrito = carrito.some(item => item.id === producto.id)
    return `
        <article class="card-producto" data-id="${producto.id}">
            <div class="pagina"></div>
            <img src="${producto.img}" alt="${producto.titulo}">
            <h3>${producto.marca}</h3>
            <h2>${producto.titulo}</h2>
            <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>

            <button class="btn btn-AddFavorito ${esFavorito ? 'active' : ''}" data-id="${producto.id}">
                <span class="sr-only">${esFavorito ? 'en favoritos' : 'Agregar a favoritos'}</span>
            </button>
            
            <button class="btn btn-agregar-carrito ${esCarrito ? 'active' : ''}" data-id="${producto.id}">${esCarrito ? 'En carrito' : 'Agregar al carrito'}</button>
            
            <a class="sr-only" href="producto.html?id=${producto.id}">Ver detalle del producto.</a>
            
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

};

//listener para el articulo
if(contenedorCatalogo){
  contenedorCatalogo.addEventListener('click', (e) => {
    const article = e.target.closest('article');
    if (!article) return;
    if (e.target.closest('.btn')) return;

    window.location.href = `producto.html?id=${article.dataset.id}`;
  });
};









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
    e.target.innerHTML ='<span class="sr-only">En Favoritos</span>';

}
localStorage.setItem('favoritos', JSON.stringify(favoritos));
renderizarFavoritos();
};

//Renderizar favoritos
function renderizarFavoritos() {
    if (!ListaFavoritos) return;
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

if(ListaFavoritos){
ListaFavoritos.addEventListener('click', (e) => {
const btn = e.target.closest('.remove-item');
if  (btn){
    const id = Number(btn.dataset.id);
    favoritos = favoritos.filter(favID => favID !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    renderizarFavoritos();
    renderizarCatalogo();
    renderizarDetalle();
}
});
};

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
    if (!ListaCarrito) return;
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

//Contador
    cartCount.classList.add('active');

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;




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
          <button class="mas" data-id="${item.id}">
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
    //suma
    ListaCarrito.querySelectorAll('.mas').forEach(btn => {
      btn.addEventListener('click', () => modificarCantidad(Number(btn.dataset.id), 1));
    });

    //resta
    ListaCarrito.querySelectorAll('.menos').forEach(btn => {
      btn.addEventListener('click', () => modificarCantidad(Number(btn.dataset.id), -1));
    });
    //Eliminar
    ListaCarrito.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', () => eliminarDelCarrito(Number(btn.dataset.id)));
    });



};


function modificarCantidad(id, delta){
const item = carrito.find(item => item.id === id);
if(item){
 item.cantidad = Math.max(1, item.cantidad + delta);
 localStorage.setItem('carrito', JSON.stringify(carrito));
 renderizarCarrito();


};

};

function eliminarDelCarrito(id){
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCatalogo();
  renderizarCarrito();
  renderizarDetalle();
}


//ver detalle

function renderizarDetalle () {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const prod = productosHtech.find(producto => producto.id === id);
    if(!prod) return;

    const esFavorito = favoritos.includes(prod.id);
    const enCarrito = carrito.some(item => item.id === prod.id);
    const contenedor = document.querySelector('.detalle-producto');
    if(!contenedor) return;

    contenedor.innerHTML = `
        <div class="contenedor-galeria">
            <img src="${prod.img}" alt="Vista superior de ${prod.titulo}">
            <img src="${prod.img2}" alt="Vista lateral de ${prod.titulo}">
            <img src="${prod.img3}" alt="Otra vista de ${prod.titulo}">
        </div>

        <div class="producto-info">
            <span class="producto-marca">${prod.marca}</span>
            <h1 class="producto-nombre">${prod.titulo}</h1>
            <p class="producto-descripcion">${prod.descripcion}</p>
            <h3 class="producto-precio">Precio: $${prod.precio.toLocaleString('es-AR')}</h3>
            
            <div class="producto-acciones">
                <button class="btn-fill btn-agregar-carrito btn-cart-detalle ${enCarrito ? 'active' : ''}">
                    ${enCarrito ? 'En carrito' : 'Agregar al carrito'}
                </button>
                
                <button class="btn-fill btn-agregar-carrito btn-fav-detalle ${esFavorito ? 'active' : ''}">
                    ${esFavorito ? 'En favoritos' : 'Agregar a favoritos'}
                </button>
            </div>
        </div>

        <div class="producto-specs">
            <h3 class="specs-titulo">Especificaciones técnicas</h3>
            <ul class="specs-lista">
                <li><span class="spec-label">Marca</span>        <span>${prod.marca}</span></li>
                <li><span class="spec-label">Modelo</span>       <span>${prod.titulo}</span></li>
                <li><span class="spec-label">${prod.tipoTecnologia}</span>       <span>${prod.tecnologia}</span></li>
                <li><span class="spec-label">Interruptores</span><span>${prod.interruptores}</span></li>
                <li><span class="spec-label">Autonomía</span>    <span>${prod.autonomia}</span></li>
                <li><span class="spec-label">Peso</span>         <span>${prod.peso}</span></li>
            </ul>
        </div>
    `;

    const btnCart = contenedor.querySelector('.btn-cart-detalle');
    const btnFav = contenedor.querySelector('.btn-fav-detalle');
    const panelCart = document.querySelector('.primary-cart');
    const fantasma = document.querySelector('.fantasma');


   

//boton de agregar favoritos
    if (btnCart) {
        btnCart.addEventListener('click', () => {
            const existe = carrito.find(item => item.id === prod.id);
            if (!existe) {
                carrito.push({id: prod.id, cantidad: 1});
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito(); 
                
                btnCart.classList.add('active');
                btnCart.textContent = 'En carrito';

                // Abrir panel
                if(panelCart) panelCart.setAttribute('data-visible', 'true');
                if(fantasma) fantasma.setAttribute('data-visible', 'true');
            };
        });
    };

    if (btnFav) {
        btnFav.addEventListener('click', () => {
            if (favoritos.includes(prod.id)) {
                favoritos = favoritos.filter(favID => favID !== prod.id);
                btnFav.classList.remove('active');
                btnFav.textContent = 'Agregar a favoritos';
            } else {
                favoritos.push(prod.id);
                btnFav.classList.add('active');
                btnFav.textContent = 'En favoritos';
            }
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            renderizarFavoritos(); 
        });
    };
};











document.addEventListener('DOMContentLoaded', async() => {
   await cargarProductos();
   //carga solamente si .detalle-producto existe
   if(document.querySelector(".detalle-producto")) {
    renderizarDetalle();
   }
});