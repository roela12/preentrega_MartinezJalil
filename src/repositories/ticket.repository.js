export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  // Mostrar tickets
  getTickets() {
    return this.dao.getTickets();
  }
  // Mostrar ticket por id
  getById(id) {
    return this.dao.getById(id);
  }
}
