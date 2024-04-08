const createPasswordForm = document.getElementById("recoveryForm");
const inputPassword = document.getElementById("password");

createPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let recoveryToken = window.location.href.split("/")[4];

  const password = inputPassword.value;

  fetch(`http://localhost:8080/api/auth/createPassword/${recoveryToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log(response);
      if (response == "El token ha expirado o es invalido.") {
        alert(response);
        window.location.href = "/recoveryPass";
      } else {
        alert(response);
        window.location.href = "/";
      }
    });
});
