// Arreglo para guardar favoritos
let favoritos = [];

// Cargar favoritos desde localStorage (si existen)
if (localStorage.getItem('favoritos')) {
    favoritos = JSON.parse(localStorage.getItem('favoritos'));
}

// Arreglo de productos (deja la URL de la imagen vacía para que puedas agregarla más tarde)
const productos = [
    { id: 1, name: "Bolso tote reversible Anna", price: "135.00 €", image: "" },
    { id: 2, name: "Cartera clásica", price: "85.00 €", image: "" },
    { id: 3, name: "Camisa de rayas", price: "55.00 €", image: "" },
    { id: 4, name: "Pantalones de chándal", price: "60.00 €", image: "" },
    { id: 5, name: "Zapatos de cuero", price: "120.00 €", image: "" },
    { id: 6, name: "Reloj de pulsera", price: "200.00 €", image: "" },
    { id: 7, name: "Bufanda de lana", price: "45.00 €", image: "" },
    { id: 8, name: "Sombrero de paja", price: "35.00 €", image: "" },
    { id: 9, name: "Chaqueta ligera", price: "75.00 €", image: "" },
    { id: 10, name: "Gafas de sol", price: "50.00 €", image: "" },
];

// Agregar producto a favoritos
document.querySelectorAll('.add-favorites').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar comportamiento predeterminado
        const producto = e.target.closest('.producto');
        const productoId = producto.getAttribute('data-id'); // Usar un atributo 'data-id' para identificar el producto

        // Verificar si ya está en favoritos por su ID
        if (!favoritos.some(fav => fav.id === productoId)) {
            const productoClone = producto.cloneNode(true);
            favoritos.push({ id: productoId, content: productoClone.innerHTML }); // Guardar el HTML del producto
            alert('Producto añadido a favoritos');

            // Marcar el corazón como favorito
            const heartIcon = producto.querySelector('.bx-heart');
            heartIcon.classList.add('favorito'); // Añadir clase para marcar el corazón

            // Guardar en localStorage
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        } else {
            alert('Este producto ya está en favoritos');
        }
    });
});

// Mostrar Favoritos
document.getElementById('favoritos-btn').addEventListener('click', () => {
    const grid = document.getElementById('catalogo-grid');
    grid.innerHTML = ''; // Limpiar el catálogo actual

    if (favoritos.length === 0) {
        grid.innerHTML = '<p>No tienes productos en favoritos.</p>'; // Mostrar un mensaje si no hay favoritos
    } else {
        // Mostrar los productos favoritos
        favoritos.forEach((fav) => {
            const producto = document.createElement('div');
            producto.classList.add('producto');
            producto.innerHTML = fav.content;

            // Cambiar el ícono del corazón a favorito
            const heartIcon = producto.querySelector('.bx-heart');
            heartIcon.classList.add('favorito'); // Añadir clase para marcar el corazón
            grid.appendChild(producto);
        });
    }
});

// Paginación básica
let currentPage = 1;
const itemsPerPage = 3;
const totalPages = Math.ceil(productos.length / itemsPerPage);

document.querySelector('.prev-page').addEventListener('click', (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado
    if (currentPage > 1) {
        currentPage--;
        actualizarPagina();
    }
});

document.querySelector('.next-page').addEventListener('click', (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado
    if (currentPage < totalPages) {
        currentPage++;
        actualizarPagina();
    }
});

function actualizarPagina() {
    const grid = document.getElementById('catalogo-grid');
    grid.innerHTML = ''; // Limpiar el catálogo actual

    // Calcular los índices de los productos a mostrar
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productosAPresentar = productos.slice(start, end);

    // Mostrar los productos correspondientes a la página actual
    productosAPresentar.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.setAttribute('data-id', producto.id);
        divProducto.innerHTML = `
            <img src="${producto.image || 'ruta-de-la-imagen-placeholder.jpg'}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${producto.price}</p>
            <button class="add-favorites">
                <i class="bx bx-heart"></i> Añadir a favoritos
            </button>
        `;
        grid.appendChild(divProducto);
    });

    document.querySelector('.page-counter').textContent = `${currentPage} / ${totalPages}`;
}

// Cargar los productos iniciales en la página (si es necesario)
document.addEventListener('DOMContentLoaded', () => {
    actualizarPagina();
});

// Desplazamiento suave al hacer clic en enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.right');
const prevButton = document.querySelector('.carousel-button.left');
let currentIndex = 0;

const updateCarousel = (index) => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';
};

// Botón "Siguiente"
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
});

// Botón "Anterior"
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex);
});


const messages = [
    "¡Bienvenido a nuestra tienda!",
    "Ofertas especiales para este mes.",
    "¡Nuevos productos añadidos cada semana!"
];

let index = 0;

const marqueeContent = document.querySelector('.marquee-content');

// Cambiar el mensaje cada 3 segundos
setInterval(() => {
    index = (index + 1) % messages.length; // Ciclar a través de los mensajes
    marqueeContent.innerHTML = `<span>${messages[index]}</span>`;
}, 3000);




