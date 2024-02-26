let username;
const socket = io();

document.getElementById("form-message").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("input-message");
  const newMessage = {
    username,
    message: input.value,
  };
  socket.emit("new-message", newMessage);
  input.value = "";
  input.focus();
});

socket.on("update-messages", (messages) => {
  const logMessages = document.getElementById("log-messages");
  logMessages.innerText = "";
  messages.forEach((message) => {
    const p = document.createElement("p");
    p.innerText = `${message.username}: ${message.message}`;
    logMessages.appendChild(p);
  });
});

Swal.fire({
  title: "Identificate",
  input: "text",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "No puedes continuar sin ingresar tu username";
    }
  },
})
  .then((result) => {
    username = result.value.trim();
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
