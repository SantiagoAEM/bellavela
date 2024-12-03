import { servicesProduct } from "../services/products-services.js";

const dataBox = document.querySelector("[data-cardproducts]");

// Variable para almacenar todos los productos
let allProducts = [];
let filteredProducts = [];

// Función para crear la tarjeta de producto
function createProduct({ id, name, category, price, image }) {
  const card = document.createElement("div");
  card.classList.add("products__card");
  card.innerHTML = `
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

// Función para renderizar los productos
const renderProducts = (products) => {
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

// Función para obtener los productos y almacenarlos
const fetchAndRenderProducts = async () => {
  try {
    const listProducts = await servicesProduct.productList();
    allProducts = listProducts; // Almacenar los productos para búsqueda
    filteredProducts = allProducts; // Inicializar filteredProducts con todos los productos
    renderProducts(filteredProducts);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

// Función para manejar la búsqueda de productos
const handleSearch = () => {
  const searchTerm = searchInput.value.toLowerCase();
  filteredProducts = allProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
  applyCategoryFilter(); // Aplicar el filtro de categoría sobre los productos filtrados por nombre
};

// Función para aplicar el filtro de categoría
const applyCategoryFilter = () => {
  const selectedCategory = currentCategory;
  if (selectedCategory && selectedCategory !== "todo") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === selectedCategory
    );
  }
  renderProducts(filteredProducts); // Renderizar productos después de aplicar ambos filtros
};

// Capturar el evento de búsqueda
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", handleSearch);

// Manejar clic en las categorías
const categoriesList = document.querySelectorAll(".categories__list li");
let currentCategory = "todo"; // Categoría por defecto

categoriesList.forEach((category) => {
  category.addEventListener("click", (event) => {
    currentCategory = event.target.getAttribute("data-category");

    // Resaltar la categoría seleccionada
    categoriesList.forEach((item) => item.classList.remove("selected"));
    event.target.classList.add("selected");

    applyCategoryFilter(); // Filtrar los productos por la categoría seleccionada
    handleSearch(); // Aplicar búsqueda con la categoría seleccionada
  });
});

// Obtener y renderizar productos al cargar la página
fetchAndRenderProducts();
