const deleteUserForm = document.querySelectorAll(".deleteUser");

for (let i = 0; i < deleteUserForm.length; i++) {
  deleteUserForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const uid = deleteUserForm[i].dataset.id;
    fetch(`/api/users/${uid}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Usuario eliminado con exito",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.replace("/editUsers");
        });
      }
    });
  });
}

const modifyRoleForm = document.querySelectorAll(".modifyRole");

for (let i = 0; i < modifyRoleForm.length; i++) {
  modifyRoleForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    let valorSeleccionado;
    const radios = modifyRoleForm[i].elements["roles"];
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        valorSeleccionado = radios[i].value;
        break;
      }
    }
    if (valorSeleccionado) {
      const uid = modifyRoleForm[i].dataset.id;
      fetch(`/api/users/modifyRole/${uid}/role/${valorSeleccionado}`, {
        method: "PUT",
      }).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Rol modificado con exito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.replace("/editUsers");
          });
        }
      });
    } else {
      Swal.fire({
        title: "No se ha seleccionado ningun rol",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
}

const deleteInactiveForm = document.querySelector(".deleteInactive");

deleteInactiveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/api/users/`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status === 200) {
      Swal.fire({
        title: "Usuarios eliminados con exito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.replace("/editUsers");
      });
    }
  });
});

const goBackForm = document.querySelector(".goBack");

goBackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.replace("/");
});
