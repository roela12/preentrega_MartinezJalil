import ticketModel from "./models/ticket.model.js";

export default class ticketMongoDao {
  // Mostrar tickets
  getTickets = async () => {
    try {
      return await ticketModel.find({});
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Mostrar ticket por id
  getById = async () => {
    try {
      return await ticketModel.findById(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
