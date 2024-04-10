const switchBtns = document.getElementsByClassName("switchRol");
const deleteBtns = document.getElementsByClassName("deleteUser");

for (let button of switchBtns) {
  button.addEventListener("click", () => {
    const userEmail = button.value;
    fetch(`./api/users/premium/${userEmail}`, { method: "PUT" })
      .then(() => {
        alert("El rol ha sido cambiado con exito");
        location.reload();
      })
      .catch((error) => console.error(error));
  });
}

for (let button of deleteBtns) {
  button.addEventListener("click", () => {
    const userEmail = button.value;
    fetch(`./api/users/${userEmail}`, { method: "DELETE" })
      .then(() => {
        alert("El usuario ha sido eliminado con exito.");
        location.reload();
      })
      .catch((error) => console.error(error));
  });
}
