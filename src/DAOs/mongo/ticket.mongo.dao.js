import ticketModel from "./models/ticket.model.js";

export default class ticketMongoDao {
  // Mostrar tickets
  getTickets = async () => {
    try {
      return await ticketModel.find({});
    } catch (error) {
      return null;
    }
  };
  // Mostrar ticket por id
  getById = async (id) => {
    try {
      return await ticketModel.findById(id);
    } catch (error) {
      return null;
    }
  };
}
