import { servicesProduct } from "../services/products-services.js";

const dataBox  = document.querySelector("[data-cardproducts]");

function createProduct({id,name,category,price,image}) {
    const card = document.createElement("div");
    card.classList.add("products__card"); 
    card.innerHTML =` 
                    <img class="products__img" src="${image}" alt="vela artesanal" data-id="${id}">
                    <div class="products__text">
                        <h3 class="products__title>${name}</h3>
                        <h4 class="products__category">${category}</h4>
                        <p class="products__price">$${price}</p>
                    </div>
                </div>
    `;
    
    return card;
}

const renderProduct = async () => {
    try {
        const listProduct = await servicesProduct.productList();
        listProduct.forEach(element => {
             const cardProduct = createProduct(element);
            dataBox.appendChild(cardProduct);
        });
    } catch (error) {
        console.error("Error al renderizar productos:", error);
    }
    
};

renderProduct();