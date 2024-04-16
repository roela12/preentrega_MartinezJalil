const form = document.getElementById("logout");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/api/sessions/logout", {
    method: "DELETE",
  }).then(window.location.replace("/login"));
});
