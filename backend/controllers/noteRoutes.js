const express = require("express");

const {
    getNotesByTicketId
} = require("../controllers/noteController");

const noteRouter = express.Router();

noteRouter.get("/:ticketId", getNotesByTicketId);

module.exports = noteRouter;