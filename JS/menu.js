//menu principal
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".menu-btn");
const closeMenu = document.querySelector('.menu-cerrar');

//capa oscura
const CloseAll = document.querySelector(".fantasma");

//menu favoritos
const primaryFav = document.querySelector('.primary-fav');
const favToggle = document.querySelector('.fav-btn');
const closeFav = document.querySelector('.fav-cerrar');



//menu carrito
const primaryCart = document.querySelector('.primary-cart');
const cartToggle = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.cart-cerrar');



//Menu Principal
navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");
    
  
    if (visibility === "true") {
        primaryNav.setAttribute("data-visible", "false");
        navToggle.setAttribute("aria-expanded", "false"); 
        CloseAll.setAttribute("data-visible", "false");
    } else if (visibility === "false") {
        primaryNav.setAttribute("data-visible", "true");
        navToggle.setAttribute("aria-expanded", "true");
        CloseAll.setAttribute("data-visible", "true");
    }

});
//cerrar menu
if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        const visibility = primaryNav.getAttribute('data-visible');
        
        if (visibility === 'true') {
            primaryNav.setAttribute('data-visible', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
            CloseAll.setAttribute('data-visible', 'false');
        }
    });
}



//favoritos
if (favToggle) {
    favToggle.addEventListener('click', () => {
        const visibility = primaryFav.getAttribute('data-visible');
        if (visibility === 'false') {
            primaryFav.setAttribute('data-visible', 'true');
            CloseAll.setAttribute('data-visible', 'true');
        } else if (visibility === 'true') {
            primaryFav.setAttribute('data-visible', 'false');
            CloseAll.setAttribute('data-visible', 'false');
        }
    });
};
//cerrar favoritos
if(closeFav){
closeFav.addEventListener('click', () => {
    const visibility = primaryFav.getAttribute('data-visible');
    
    if (visibility === 'true') {
        primaryFav.setAttribute('data-visible', 'false');
        CloseAll.setAttribute('data-visible', 'false');
    }
});
};


///carrito
if(cartToggle){
cartToggle.addEventListener('click', () => {
    const visibility = primaryCart.getAttribute('data-visible');
    
    if (visibility === 'false') {
        primaryCart.setAttribute('data-visible', 'true');
        CloseAll.setAttribute('data-visible', 'true');
    } else if (visibility === 'true') {
        primaryCart.setAttribute('data-visible', 'false');
        CloseAll.setAttribute('data-visible', 'false');
    }

    document.body.classList.add('no-scroll');//pausar el scroll de la pagina
});
};

//cerrar carrito
if(closeCart){
closeCart.addEventListener('click', () => {
    const visibility = primaryCart.getAttribute('data-visible');
    
    if (visibility === 'true') {
        primaryCart.setAttribute('data-visible', 'false');
        if(CloseAll) {
                CloseAll.setAttribute('data-visible', 'false');
        }
    }
    document.body.classList.remove('no-scroll');//volver a poner el scroll de la pagina
});
};


//cerrar todo con el fantasma
CloseAll.addEventListener('click', () => {
    const visibilityNav = primaryNav.getAttribute('data-visible');
    const visibilityFav = primaryFav.getAttribute('data-visible');
    const visibilityCart = primaryCart.getAttribute('data-visible');

    if(visibilityNav === 'true' || visibilityFav === 'true' || visibilityCart === 'true'){
        primaryNav.setAttribute('data-visible', 'false');
        primaryFav.setAttribute('data-visible', 'false');
        primaryCart.setAttribute('data-visible', 'false');
        
        navToggle.setAttribute('aria-expanded', 'false');
        CloseAll.setAttribute('data-visible', 'false');

        document.body.classList.remove('no-scroll');//volver a poner el scroll de la pagina cerrando desde el .fantasma
    }
});



