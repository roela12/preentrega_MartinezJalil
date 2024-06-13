import { ticketService } from "../repositories/services.js";
import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";

const ticketController = {
  // Mostrar tickets
  getTickets: async (req, res, next) => {
    try {
      const result = await ticketService.getTickets();
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
      const result = await ticketService.getById(id);
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
