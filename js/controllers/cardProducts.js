import { servicesProduct } from "../services/products-services.js";

const dataBox = document.querySelector("[data-cardproducts]");

// Variable para almacenar todos los productos
let allProducts = [];

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
    renderProducts(allProducts);
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
    filteredProducts = filteredProducts.filter(
      (product) =>
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

    handleSearch({ target: { value: searchInput.value } }); // Filtrar productos por categoría
  });
});

// Obtener y renderizar productos al cargar la página
fetchAndRenderProducts();
