const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".menu-btn");
const CloseAll = document.querySelector(".fantasma");


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

CloseAll.addEventListener ('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');

if (visibility === "true") {
        primaryNav.setAttribute("data-visible", "false");
        navToggle.setAttribute("aria-expanded", "fasle");
        CloseAll.setAttribute("data-visible", "false");
    
    }

});