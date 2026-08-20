const noteModel = require("../models/noteModel");
const Ticket = require("../models/ticketModel");
const Counter = require("../models/counterModel");

const createTicket = async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            subject,
            description
        } = req.body;

        // Validate required fields
        if (
            !customer_name ||
            !customer_email ||
            !subject ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Atomically increment the ticket counter
        const counter = await Counter.findOneAndUpdate(
            { name: "ticket" },
            {
                $inc: {
                    sequence: 1
                }
            },
            {
                returnDocument: "after",
                upsert: true
            }
        );

        const ticket_id = `TKT-${String(
            counter.sequence
        ).padStart(3, "0")}`;

        // Create ticket
        const ticket = await Ticket.create({
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description
        });

        res.status(201).json({
            ticket_id: ticket.ticket_id,
            created_at: ticket.created_at
        });

    } catch (error) {
        console.error("Create ticket error:", error);

        res.status(500).json({
            message: "Failed to create ticket"
        });
    }
};

const getTickets = async (req, res) => {
    try {
        const { search, status } = req.query;

        let filter = {};

        if (search) {
            filter.$or = [
                { ticket_id: { $regex: search, $options: "i" } },
                { customer_name: { $regex: search, $options: "i" } },
                { customer_email: { $regex: search, $options: "i" } },
                { subject: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (status) {
            filter.status = status;
        }

        const tickets = await Ticket.find(filter)
            .sort({ created_at: -1 });

        res.status(200).json(tickets);

    } catch (error) {
        console.error("Get tickets error:", error);

        res.status(500).json({
            message: "Failed to fetch tickets"
        });
    }
};

const getTicket = async (req, res) => {
    try {
        const { ticket_id } = req.params;

        const ticket = await Ticket.findOne({ ticket_id });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        res.status(200).json(ticket);

    } catch (error) {
        console.error("Get ticket error:", error);

        res.status(500).json({
            message: "Failed to fetch ticket"
        });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { ticket_id } = req.params;
        const { status, notes } = req.body;

        const ticket = await Ticket.findOne({ ticket_id });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Store the old status before changing it
        const oldStatus = ticket.status;

        // Update status
        if (status) {
            ticket.status = status;
        }

        await ticket.save();

        // Create activity when status changes
        if (status && status !== oldStatus) {
            await noteModel.create({
                ticket_id: ticket_id,
                note_text: `Status changed from ${oldStatus} to ${status}`,
                action_type: "status_change"
            });
        }

        // Create internal note
        if (notes && notes.trim() !== "") {
            await noteModel.create({
                ticket_id: ticket_id,
                note_text: notes,
                action_type: "note"
            });
        }

        res.status(200).json({
            success: true,
            updated_at: ticket.updated_at
        });

    } catch (error) {
        console.error("Update ticket error:", error);

        res.status(500).json({
            message: "Failed to update ticket"
        });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket
};