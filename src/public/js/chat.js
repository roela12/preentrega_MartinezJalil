const socket = io();
console.log("Conectado");

let user;

// Pregunto por el email
window.onload = () => {
  Swal.fire({
    title: "Igrese su email",
    input: "email",
    inputValidator: (value) => {
      return !value && "Necesitas escribir un email para continuar";
    },
    confirmButtonText: "OK",
  }).then((result) => {
    email = result.value;
    socket.emit("email", email);
  });
};

const chatbox = document.getElementById("chatbox");
const log = document.getElementById("log");

// Envio el mensaje al servidor
chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log(chatbox.value);
    socket.emit("message", { email: email, message: chatbox.value });
  }
});

// Escucho al servidor para  recibir mensajes
socket.on("messageLogs", (data) => {
  let messages = "";

  data.forEach((msg) => {
    messages += `${msg.email} dice: ${msg.message}<br/>`;
  });

  log.innerHTML = messages;
});
