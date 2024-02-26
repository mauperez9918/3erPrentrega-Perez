const createPasswordForm = document.getElementById("recoveryForm");
const input = document.getElementById("password");

createPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let recoveryToken = window.location.href.split("/")[4];

  const password = input.value;

  fetch(`http://localhost:8080/api/auth/createPassword/${recoveryToken}`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });

  input.value = "";
});
