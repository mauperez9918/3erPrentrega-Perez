const categoriesSelect = document.getElementById("categories");
const statusSelect = document.getElementById("status");
const priceSelect = document.getElementById("price");

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
  console.log(url);
  url.searchParams.set("status", e.target.value);

  window.location.href = url.toString();
});

priceSelect.addEventListener("change", (e) => {
  let url = new URL(window.location.href);

  url.searchParams.set("sort", e.target.value);

  window.location.href = url.toString();
});
