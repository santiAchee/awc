# 💻 Htech - E-commerce de Periféricos High-End

Este proyecto es una plataforma de comercio electrónico de última generación diseñada específicamente para entusiastas del hardware y periféricos de alto rendimiento. Desde teclados mecánicos custom hasta mouses con tasas de sondeo competitivas, Htech ofrece lo mejor del mercado para llevar tu setup al siguiente nivel.

*Proyecto integrador desarrollado para la materia **Aplicaciones Web Cliente**.*

---

## 📸 Vista Previa
![alt text](/img/readme/image.png)

---

## 🚀 Funcionalidades Principales

El proyecto simula la experiencia completa de una tienda online, integrando manejo de estado y consumo de datos en tiempo real:

* **Catálogo Dinámico (API REST):** Los productos se renderizan dinámicamente consumiendo datos desde Airtable mediante `fetch` y funciones asíncronas.
* **🛒 Gestión de Carrito:** Sistema completo que permite agregar productos, modificar cantidades y eliminar ítems, calculando subtotales y el total final de forma automática.
* **❤️ Lista de Favoritos:** Funcionalidad para guardar y visualizar los productos deseados con un solo clic.
* **💾 Persistencia Local:** El estado del carrito y la lista de favoritos se guardan en el `localStorage` del navegador, garantizando que el usuario no pierda su información al recargar la página.
* **🔍 Vistas de Detalle:** Páginas individuales por producto generadas dinámicamente extrayendo parámetros de la URL mediante `URLSearchParams`.
* **📱 Diseño Full Responsive:** Interfaz adaptable a Mobile, Tablet y Desktop utilizando CSS Grid, Flexbox y Media Queries.
* **♿ Accesibilidad (A11y):** Implementación de etiquetas `aria-` y clases `.sr-only` para mejorar la navegación mediante lectores de pantalla.

---

## 🛠️ Stack Tecnológico

* **Frontend:** HTML5 (Semántico), CSS3 (Variables, Custom Properties, Backdrop-filter).
* **Lógica:** JavaScript Vanilla (ES6+, Arrow functions, Métodos de arrays como `map`, `filter`, `reduce`).
* **Backend / Base de Datos:** Airtable (API REST).

---

## 🎨 Diseño y UI

El esquema visual fue pensado para transmitir una estética de alta tecnología y hardware premium, priorizando el contraste para destacar los productos.

* **Tipografías:** `Bebas Neue` para los títulos y `Nunito Sans` para el cuerpo de texto.
* **Paleta de Colores Principal:**
  * ⬛ **Fondo Base:** `hsl(214, 25%, 3%)` (Azul ultra oscuro).
  * 🟦 **Acento Principal:** `hsl(214, 89%, 36%)` (Azul vibrante).
  * 💡 **Acento Secundario (Hover):** `hsl(214, 85%, 55%)`.
  * ⬜ **Texto Base:** `hsl(215, 25%, 90%)` (Gris azulado claro para descansar la vista).


---

## 📂 Estructura del Proyecto

```text
📦 Htech
 ┣ 📂 CSS
 │ ┗ 📜 estilos.css
 ┣ 📂 JS
 │ ┣ 📜 main.js (Lógica de negocio, API y carrito)
 │ ┗ 📜 menu.js (Interacciones del DOM y Menús laterales)
 ┣ 📂 DATA
 │ ┗ 📜 producto.json (Estructura base de datos)
 ┣ 📂 img (Assets gráficos e íconos SVG)
 ┣ 📜 index.html (Página principal / Catálogo)
 ┣ 📜 producto.html (Plantilla de detalle de producto)
 ┣ 📜 quienes.html (Acerca de nosotros)
 ┗ 📜 README.md