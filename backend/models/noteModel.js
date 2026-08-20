const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        ticket_id: {
            type: String,
            required: true
        },

        note_text: {
            type: String,
            required: true,
            trim: true
        },

        action_type: {
            type: String,
            enum: ["note", "status_change"],
            default: "note"
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: false
        }
    }
);

module.exports = mongoose.model("Note", noteSchema);