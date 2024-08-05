const cid = document.querySelector(".cart").dataset.cid;
const removeItemForm = document.querySelectorAll(".removeProduct");

for (let i = 0; i < removeItemForm.length; i++) {
  removeItemForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const pid = removeItemForm[i].dataset.pid;
    fetch(`/api/cart/${cid}/product/${pid}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Producto eliminado con exito",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.replace(`/cart/?cid=${cid}`);
        });
      }
    });
  });
}

const purchaseCartForm = document.querySelector(".purchaseCart");

purchaseCartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/api/cart/${cid}/purchase`, {
    method: "POST",
  }).then((response) => {
    if (response.status === 200) {
      Swal.fire({
        title: "Carrito comprado con exito (ticket generado)",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace(`/cart/?cid=${cid}`);
      });
    }
  });
});

const goBackForm = document.querySelector(".goBack");

goBackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.replace("/");
});
