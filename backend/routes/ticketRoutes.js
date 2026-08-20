const express = require("express");

const {
    createTicket,
    getTickets,
    getTicket,
    updateTicket
} = require("../controllers/ticketController");

const ticketRouter = express.Router();

ticketRouter.post("/", createTicket);
ticketRouter.get("/", getTickets);
ticketRouter.get("/:ticket_id", getTicket);
ticketRouter.put("/:ticket_id", updateTicket);

module.exports = ticketRouter;