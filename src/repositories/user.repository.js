export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  // Mostrar usuarios
  getUsers() {
    return this.dao.getUsers();
  }
  // Mostrar usuario por id
  getById(id) {
    return this.dao.getById(id);
  }
  // Buscar por mail
  getByEmail(email) {
    return this.dao.getByEmail(email);
  }
  // Actualizar contrasena
  updatePassword(uid, newPassword) {
    return this.dao.updatePassword(uid, newPassword);
  }
  // Mejorar rol a premium
  changeToPremium(uid) {
    return this.dao.changeToPremium(uid);
  }
  // Subir documentos
  uploadDocument(uid, document) {
    return this.dao.uploadDocument(uid, document);
  }
  // Modificar rol
  modifyRole(uid, newRole) {
    return this.dao.modifyRole(uid, newRole);
  }
  // Borrar usuario
  deleteUser(uid) {
    return this.dao.deleteUser(uid);
  }
  // Borrar usuarios inactivos por mas de dos dias
  deleteInactiveUsers() {
    return this.dao.deleteInactiveUsers();
  }
}
