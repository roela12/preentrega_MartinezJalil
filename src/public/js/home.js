const logoutForm = document.getElementById("logout");
const addToCartForm = document.querySelectorAll(".addToCart");
const editUsersForm = document.getElementById("users");
const myCartForm = document.getElementById("myCart");
const cid = document.querySelector(".cart").dataset.cid;

for (let i = 0; i < addToCartForm.length; i++) {
  addToCartForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const pid = addToCartForm[i].id;
    fetch(`/api/cart/${cid}/product/${pid}`, {
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Producto agregado al carrito",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  });
}

logoutForm.addEventListener("submit", (e) => {
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

if (editUsersForm) {
  editUsersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.replace("/editUsers");
  });
}

myCartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.replace(`/cart/?cid=${cid}`);
});
