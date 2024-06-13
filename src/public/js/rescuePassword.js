const form = document.getElementById("passwordForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/users/rescue-password", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      Swal.fire({
        title: "Contraseña cambiada",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/login");
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
