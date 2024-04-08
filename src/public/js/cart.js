const deleteButtons = document.getElementsByClassName("deleteButton");
const btnPurchase = document.getElementById("btnPurchase");
let userData;

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

const token = getCookie("token");

if (token) {
  userData = JSON.parse(atob(token.split(".")[1]));
} else {
  console.log("No se ha encontrado un token JWT en la cookie.");
}

btnPurchase.addEventListener("click", () => {
  fetch(`./api/carts/purchase`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response);
      location.reload();
    });
});

for (let button of deleteButtons) {
  const productId = button.dataset.id;

  button.addEventListener("click", () => {
    fetch(`./api/carts/${userData.cart}/products/${productId}`, {
      method: "DELETE",
    }).then(() => {
      alert("Su producto ha sido eliminado correctamente");
      location.reload();
    });
  });
}
