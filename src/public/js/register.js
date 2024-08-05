const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 201) {
      Swal.fire({
        title: "Registro exitoso",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/login");
      });
    } else {
      Swal.fire({
        title: "El usuario ya existe",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
});

const goBackForm = document.querySelector(".goBack");

goBackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.replace("/");
});
