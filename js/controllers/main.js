import { servicesProduct } from "../services/products-services.js";

const dataContainer = document.querySelector("[data-products]");
const form = document.querySelector("[data-form]");

function createCard({id,name, category, price, description,image}) {
    const card = document.createElement("div");
    card.classList.add("productsCard");
    card.innerHTML = `
   
                        <img class="productsCard__img" src="${image}" alt="vela artesanal">
                        <div class="productsCard__text">
                        <h3 class="productsCard__title">${name}</h3>
                        <h4 class="productsCard__category">${category}</h4>
                        <p class="productsCard__price">$${price}</p>
                        <p class="productsCard__description">${description} </p>
                        </div>
                        <button class="button__edit" title="Editar" data-id="${id}" popovertarget="editModal">
                            <svg class="icon | icon--edit"><use href="#editIcon" ></use></svg>
                        </button>
                        <button class="button__delete" title="Eliminar" data-idd="${id}">
                            <svg class="icon | icon--delete"><use href="#deleteIcon" ></use></svg>
                        </button>
                    </div>
    `; 

       // Asigna el evento de eliminación
        addDeleteEvent(card, id);
        actualizarProducts(id, card);
     return card;
    
}


//Función para llenar datos en el formulario y poder actualizar productos
function actualizarProducts(id, card) {
    const editButton = card.querySelector(".button__edit");
    editButton.addEventListener("click", () => {
        // Captura el datos del producto
        const productId = id; 
        const name = card.querySelector(".productsCard__title").textContent;
        const category = card.querySelector(".productsCard__category").textContent;
        const price = card.querySelector(".productsCard__price").textContent.replace("$", "");
        const description = card.querySelector(".productsCard__description").textContent;
        const image = card.querySelector(".productsCard__img").src;

        // Asigna los valores al formulario
        document.querySelector("[data-eid]").value = productId;
        document.querySelector("[data-ename]").value = name;
        document.querySelector("[data-ecategory]").value = category;
        document.querySelector("[data-eprice]").value = price;
        document.querySelector("[data-edescription]").value = description;
        document.querySelector("[data-eimage]").value = image;
    });
}
//Función para actualizar productos
const editProductForm = document.getElementById("editProductForm");

editProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.querySelector("[data-eid]").value; // ID del producto
    const updatedData = {
        name: document.querySelector("[data-ename]").value,
        category: document.querySelector("[data-ecategory]").value,
        price: parseFloat(document.querySelector("[data-eprice]").value),
        description: document.querySelector("[data-edescription]").value,
        image: document.querySelector("[data-eimage]").value,
    };

    try {
        await servicesProduct.editProduct(id, updatedData);
        console.log(`Producto con id ${id} actualizado exitosamente`);
        location.reload();
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
    }
});


//Función para eliminar productos
function addDeleteEvent(card,id) {
    const deleteButton = card.querySelector(".button__delete");
    deleteButton.addEventListener("click", async () => {
        try {
            await servicesProduct.deleteProduct(id);
            card.remove();
            console.log(`Producto con id ${id} eliminado`);
        } catch (err) {
            console.error(`Error al eliminar el producto con id ${id}:`, err); 
        }
        
    });
    
}

const renderProducts = async () => {
    try {
        const listProducts = await servicesProduct.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            dataContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al renderizar productos:", error);
    }
};

form.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const category = document.querySelector("[data-category]").value;
    const price = document.querySelector("[data-price]").value;
    const description = document.querySelector("[data-description]").value;
    const image = document.querySelector("[data-image]").value

    try {
        const newProduct =  await servicesProduct.addProduct(name, category, price, description,image);
        console.log(newProduct)
        const newCard = createCard(newProduct);
        dataContainer.appendChild(newCard);
        
    } catch (error) {
        console.log("error")
    }
    form.reset();
});

renderProducts();