const Note = require("../models/noteModel");

const getNotesByTicketId = async (req, res) => {
    try {
        const { ticketId } = req.params;

        const notes = await Note.find({
            ticket_id: ticketId
        }).sort({ created_at: -1 });

        res.status(200).json(notes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch notes"
        });
    }
};

module.exports = {
    getNotesByTicketId
};