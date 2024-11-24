const BASE_URL = "http://localhost:3000/products";

// Función para obtener el producto
const productList = async () => {

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log("Error al listar productos")
    }
    
}
// Función para agregar el producto
const addProduct = async(name, category, price, description,image) =>{
    try {
        const response = await fetch(BASE_URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, category, price, description,image}),
    });
    const data = await response.json();
    return data;
    
    } catch (error) {
        console.log("Error al crear el nuevo producto")
    }
}
// Función para eliminar el producto
const deleteProduct = async (id) => {
    try {
        await fetch(`${BASE_URL}/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            },
        });
        console.log(`Producto con id ${id} eliminado exitosamente`); 
    } catch (err) {
        console.error("Error en la solicitud DELETE:", err);  
    }
    
}

// Función para actualizar el producto
const editProduct = async (id, updatedData) => {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
        console.log(`Producto con id ${id} actualizado exitosamente`);
    } catch (err) {
        console.error("Error al actualizar el producto:", err);
    }
};

export const servicesProduct = {
    productList,
    addProduct,
    deleteProduct,
    editProduct
};