import { servicesProduct } from "../services/products-services.js";

const dataBox  = document.querySelector("[data-cardproducts]");

function createProduct({id,name,category,price,image}) {
    const card = document.createElement("div");
    card.classList.add("products__card"); 
    card.innerHTML =` 
                    <img class="products__img" src="${image}" alt="vela artesanal" data-id="${id}">
                    <div class="products__text">
                        <h3 class="products__title">${name}</h3>
                        <h4 class="products__category">${category}</h4>
                        <p class="products__price">$${price}</p>
                    </div>
                </div>
    `;
    
    return card;
}
// Función para renderizar productos
// const renderProduct = async () => {
//     try {
//         const listProduct = await servicesProduct.productList();
//         listProduct.forEach(element => {
//              const cardProduct = createProduct(element);
//             dataBox.appendChild(cardProduct);
//         });
//     } catch (error) {
//         console.error("Error al renderizar productos:", error);
//     }
    
// };

// renderProduct();

const searchInput = document.querySelector("#searchInput");
const categoriesList = document.querySelectorAll(".categories_list li");

// Función para renderizar productos
const renderProducts = async (products) => {
    try {
        dataBox.innerHTML = "";
        products.forEach((product) => {
            const productCard = createProduct(product);
            dataBox.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al renderizar productos:", error);
    }
};

// Función para obtener los productos y renderizarlos
const fetchAndRenderProducts = async () => {
    try {
        const listProducts = await servicesProduct.productList();
        renderProducts(listProducts);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

// Función para manejar la búsqueda de productos
const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    let filteredProducts = allProducts;

    // Filtrar por búsqueda
    if (searchTerm !== "") {
        filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Filtrar por categoría seleccionada
    const selectedCategory = currentCategory;
    if (selectedCategory && selectedCategory !== "todo") {
        filteredProducts = filteredProducts.filter(
            (product) => product.category.toLowerCase() === selectedCategory
        );
    }

    renderProducts(filteredProducts);
};

// Capturar el evento de búsqueda
searchInput.addEventListener("input", handleSearch);

// Función para manejar el clic en las categorías
let currentCategory = "todo"; // Categoría por defecto

categoriesList.forEach((category) => {
    category.addEventListener("click", (event) => {
        currentCategory = event.target.getAttribute("data-category");
        // Resaltar la categoría seleccionada
        categoriesList.forEach((item) => item.classList.remove("selected"));
        event.target.classList.add("selected");

        handleSearch({ target: { value: searchInput.value } }); // Filtrar productos por categoría
    });
});

// Variable para almacenar todos los productos
let allProducts = [];

// Obtener y almacenar todos los productos al cargar la página
fetchAndRenderProducts().then((products) => {
    allProducts = products; // Almacenar los productos para búsqueda
});