const socket = io();

socket.on("getProducts", (products) => {
  let productCard = document.getElementById("productCard");
  productCard.innerHTML = "";
  products.forEach((product) => {
    productCard.innerHTML += `
    <p>${product._id}</p> <p>${product.title}</p>`;
  });
});

const deleteForm = document.getElementById("deleteForm");
const input = document.getElementById("inputId");

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) {
    console.log("Ingrese un id valido.");
  } else {
    socket.emit("deleteProduct", input.value);
  }

  input.value = "";
});

const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(addProductForm);
  let title = formData.get("title");
  let description = formData.get("description");
  let price = formData.get("price");
  let thumbnail = formData.get("thumbnail");
  let code = formData.get("code");
  let stock = formData.get("stock");
  let category = formData.get("category");
  let status = formData.get("status");

  const data = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
  };

  socket.emit("addProduct", data);
});
