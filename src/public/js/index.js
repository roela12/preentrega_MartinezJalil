const socket = io();
console.log("Conectado");

// Escuchar mensajes del servidor
socket.on("products", (products) => {
  let myDiv = document.getElementById("products");
  myDiv.innerHTML = ""; // Vaciar el div de productos anteriores
  products.forEach((element) => {
    myDiv.innerHTML += `<h2>${element.title}</h2>
    <p>${element.description}</p>
    <p>Precio: ${element.price}</p>
    <p>${element.thumbnail}</p>
    <p>Codigo: ${element.code}</p>
    <p>Stock: ${element.stock}</p>
    <p>Categoria: ${element.category}</p>
    <p>Id: ${element.id}</p>
    <p>Estado: ${element.status}</p>`;
  });
});

//  Escuchar el evento para agregar un nuevo producto
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

    let data = {
      title: title,
      description: description,
      price: price,
      code: code,
      stock: stock,
      category: category,
    };

    socket.emit("addProductData", data);

    event.target.reset();
  });

//  Escuchar el evento para eliminar un producto
document
  .getElementById("deleteProductForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const productId = parseInt(document.getElementById("productId").value);
    socket.emit("deleteProductData", productId);

    event.target.reset();
  });
