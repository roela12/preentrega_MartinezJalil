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
}
