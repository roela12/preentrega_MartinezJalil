const form = document.getElementById("logout");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/api/sessions/logout", {
    method: "DELETE",
  }).then((response) => {
    if (response.status === 200) {
      Swal.fire({
        title: "Cierre de sesion exitoso",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/login");
      });
    }
  });
});
