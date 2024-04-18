const form = document.getElementById("loginForm");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      Swal.fire({
        title: "Inicio de sesion exitoso",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/");
      });
    } else {
      Swal.fire({
        title: "Revisar las credenciales",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/login");
      });
    }
  });
});
