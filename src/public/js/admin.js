const switchBtn = document.getElementsByClassName("switchRol");
const deleteBtn = document.getElementsByClassName("deleteUser");

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

switchBtn
  .addEventListener("click", () => {
    fetch(`./api/users/premium/${userData._id}`, { method: "PUT" });
  })
  .then(() => {
    alert("Su producto ha sido eliminado.");
    location.reload();
  })
  .catch((error) => console.error(error));
