import ticketMongoDao from "../DAOs/mongo/ticket.mongo.dao.js";

const ticket = new ticketMongoDao();

export default class ticketService {
  // Mostrar tickets
  getTickets = async () => {
    return await ticket.getTickets();
  };
  // Mostrar ticket por id
  getById = async () => {
    return await ticket.getById(id);
  };
}
