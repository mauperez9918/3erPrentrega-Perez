const categoriesSelect = document.getElementById("categories");
const statusSelect = document.getElementById("status");
const priceSelect = document.getElementById("price");
const addToCartButtons = document.getElementsByClassName("addToCartBtn");
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

for (let button of addToCartButtons) {
  button.addEventListener("click", () => {
    const productId = button.dataset.id;

    fetch(`./${userData.cart}/products/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => alert(response.message))
      .catch((error) => console.error(error));
  });
}

categoriesSelect.addEventListener("change", (e) => {
  let url = new URL(window.location.href);

  if (e.target.value === "all") {
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("category", e.target.value);
  }

  window.location.href = url.toString();
});

statusSelect.addEventListener("change", (e) => {
  let url = new URL(window.location.href);

  url.searchParams.set("status", e.target.value);

  window.location.href = url.toString();
});

priceSelect.addEventListener("change", (e) => {
  let url = new URL(window.location.href);

  url.searchParams.set("sort", e.target.value);

  window.location.href = url.toString();
});
