const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".menu-btn");

navToggle.addEventListener("click", () => {
   
    const visibility = primaryNav.getAttribute("data-visible");
    
  
    if (visibility === "true") {
        primaryNav.setAttribute("data-visible", "false");
        navToggle.setAttribute("aria-expanded", "false"); 
    } else if (visibility === "false") {
        primaryNav.setAttribute("data-visible", "true");
        navToggle.setAttribute("aria-expanded", "true");
    }
});