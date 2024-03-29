const socket = io();
console.log("Conectado");

// Escuchar mensajes del servidor
socket.on("products", (products) => {
  let myDiv = document.getElementById("products");
  myDiv.innerHTML = ""; // Vaciar el div de productos anteriores
  products.forEach((element) => {
    myDiv.innerHTML += `<hr />
    <h3>${element.title}</h3>
    <p>${element.description}</p>
    <p>Precio: ${element.price}</p>
    <p>${element.thumbnails}</p>
    <p>Codigo: ${element.code}</p>
    <p>Stock: ${element.stock}</p>
    <p>Categoria: ${element.category}</p>
    <p>Id: ${element._id}</p>
    <p>Estado: ${element.status}</p>
    <p>Marca: ${element.brand}</p>`;
  });
});

// Escuchar el evento para agregar un nuevo producto
document
  .getElementById("addProductForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const code = document.getElementById("code").value;
    const stock = parseInt(document.getElementById("stock").value);
    const category = document.getElementById("category").value;
    const brand = document.getElementById("brand").value;

    const data = {
      title: title,
      description: description,
      price: price,
      code: code,
      stock: stock,
      category: category,
      brand: brand,
    };

    socket.emit("addProductData", data);

    event.target.reset();
  });

//  Escuchar el evento para eliminar un producto
document
  .getElementById("deleteProductForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const productId = document.getElementById("productId").value;
    socket.emit("deleteProductData", productId);
    event.target.reset();
  });
