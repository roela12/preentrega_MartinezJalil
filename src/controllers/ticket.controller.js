import ticketService from "../services/ticket.service.js";

const ticket = new ticketService();

const ticketController = {
  // Mostrar tickets
  getTickets: async (req, res) => {
    res.send(await ticket.getTickets());
  },
  // Mostrar ticket por id
  getTicketById: async (req, res) => {
    const id = req.params.id;
    res.send(await ticket.getById(id));
  },
};

export default ticketController;
