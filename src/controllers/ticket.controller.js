import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";
import ticketService from "../services/ticket.service.js";

const ticket = new ticketService();

const ticketController = {
  // Mostrar tickets
  getTickets: async (req, res, next) => {
    try {
      const result = await ticket.getTickets();
      if (!result) {
        CustomError.createError(
          "Tickets not found",
          "something went wrong",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Mostrar ticket por id
  getTicketById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await ticket.getById(id);
      if (!result) {
        CustomError.createError(
          "Ticket not found",
          "invalid ticket id",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  },
};

export default ticketController;
