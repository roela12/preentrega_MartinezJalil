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
  getByEmail(email) {
    return this.dao.getByEmail(email);
  }
  updatePassword(uid, newPassword) {
    return this.dao.updatePassword(uid, newPassword);
  }
  changeToPremium(uid) {
    return this.dao.changeToPremium(uid);
  }
  uploadDocument(uid, document) {
    return this.dao.uploadDocument(uid, document);
  }
  modifyRole(uid, newRole) {
    return this.dao.modifyRole(uid, newRole);
  }
  deleteUser(uid) {
    return this.dao.deleteUser(uid);
  }
  deleteInactiveUsers() {
    return this.dao.deleteInactiveUsers();
  }
}
