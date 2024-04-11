const form = document.getElementById("logout");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/api/sessions/logout", {
    method: "GET",
  }).then(window.location.replace("/login"));
});
