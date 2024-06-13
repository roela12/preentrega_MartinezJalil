const form = document.getElementById("emailForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/users/recover-password", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      Swal.fire({
        title: "Mail para cambiar la contraseña enviado",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/login");
      });
    } else if (response.status === 404) {
      Swal.fire({
        title: "Este email no está registrado",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Ocurrió un error inesperado, intente de nuevo mas tarde",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
});
