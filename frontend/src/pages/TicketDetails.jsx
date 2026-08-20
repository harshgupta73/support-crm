import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TicketDetails.css";

function TicketDetails() {
    const { ticketId } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState(null);
    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");

    const [updating, setUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");

    useEffect(() => {
        fetchData();
    }, [ticketId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");

            const ticketResponse = await axios.get(
                `http://localhost:5000/api/tickets/${ticketId}`
            );

            const notesResponse = await axios.get(
                `http://localhost:5000/api/notes/${ticketId}`
            );

            setTicket(ticketResponse.data);
            setStatus(ticketResponse.data.status);
            setNotes(notesResponse.data);

        } catch (error) {
            console.error(error);
            setError("Failed to load ticket details.");
        } finally {
            setLoading(false);
        }
    };

    const updateTicket = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);
            setUpdateMessage("");

            await axios.put(
                `http://localhost:5000/api/tickets/${ticketId}`,
                {
                    status,
                    notes: note
                }
            );

            setUpdateMessage(
                "Ticket updated successfully."
            );

            setNote("");

            await fetchData();

        } catch (error) {
            console.error(error);

            setUpdateMessage(
                "Failed to update ticket."
            );

        } finally {
            setUpdating(false);
        }
    };

    const getStatusClass = () => {
        switch (ticket?.status) {
            case "Open":
                return "status-open";

            case "In Progress":
                return "status-progress";

            case "Closed":
                return "status-closed";

            default:
                return "";
        }
    };

    if (loading) {
        return (
            <div className="container ticket-loading">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="mt-3 text-muted">
                    Loading ticket...
                </p>
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error || "Ticket not found."}
                </div>

                <Link
                    to="/tickets"
                    className="btn btn-primary"
                >
                    Back to Tickets
                </Link>
            </div>
        );
    }

    return (
        <div className="ticket-details-page">

            <div className="container py-4 py-md-5">

                {/* Page Header */}

                <div className="ticket-page-header">

                    <div>

                        <Link
                            to="/tickets"
                            className="back-link"
                        >
                            ← Back to Tickets
                        </Link>

                        <h1 className="fw-bold mt-3 mb-1">
                            Ticket Details
                        </h1>

                        <p className="text-muted mb-0">
                            View and manage ticket information.
                        </p>

                    </div>

                    <span
                        className={`status-badge ${getStatusClass()}`}
                    >
                        {ticket.status}
                    </span>

                </div>


                {/* Main Content */}

                <div className="row g-4 mt-2">

                    {/* Ticket Information */}

                    <div className="col-lg-8">

                        <div className="details-card">

                            <div className="details-card-header">

                                <div>

                                    <span className="text-muted">
                                        Ticket ID
                                    </span>

                                    <h3 className="mb-0">
                                        {ticket.ticket_id}
                                    </h3>

                                </div>

                                <span
                                    className={`status-badge ${getStatusClass()}`}
                                >
                                    {ticket.status}
                                </span>

                            </div>

                            <hr />

                            <div className="row g-4">

                                {/* Customer Name */}

                                <div className="col-md-6">

                                    <label>
                                        Customer Name
                                    </label>

                                    <p>
                                        {ticket.customer_name}
                                    </p>

                                </div>


                                {/* Customer Email */}

                                <div className="col-md-6">

                                    <label>
                                        Customer Email
                                    </label>

                                    <p>
                                        {ticket.customer_email}
                                    </p>

                                </div>


                                {/* Subject */}

                                <div className="col-12">

                                    <label>
                                        Subject
                                    </label>

                                    <p>
                                        {ticket.subject}
                                    </p>

                                </div>


                                {/* Description */}

                                <div className="col-12">

                                    <label>
                                        Description
                                    </label>

                                    <div className="description-box">
                                        {ticket.description}
                                    </div>

                                </div>


                                {/* Created At */}

                                <div className="col-md-6">

                                    <label>
                                        Created At
                                    </label>

                                    <p>
                                        {new Date(
                                            ticket.created_at
                                        ).toLocaleString()}
                                    </p>

                                </div>


                                {/* Updated At */}

                                <div className="col-md-6">

                                    <label>
                                        Last Updated
                                    </label>

                                    <p>
                                        {new Date(
                                            ticket.updated_at
                                        ).toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Activity History */}

                        <div className="notes-section">

                            <div className="notes-header">

                                <h2>
                                    Activity History
                                </h2>

                                <span>
                                    {notes.length}{" "}
                                    {notes.length === 1
                                        ? "activity"
                                        : "activities"}
                                </span>

                            </div>


                            {notes.length === 0 ? (

                                <p className="no-notes">
                                    No activity yet.
                                </p>

                            ) : (

                                <div className="notes-list">

                                    {notes.map((item) => (

                                        <div
                                            className="note-card"
                                            key={item._id}
                                        >

                                            <p>
                                                {item.note_text}
                                            </p>

                                            <small>
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleString()}
                                            </small>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>


                    {/* Update Ticket */}

                    <div className="col-lg-4">

                        <div className="update-card">

                            <h4>
                                Update Ticket
                            </h4>

                            <p className="text-muted small">
                                Change the ticket status and add an
                                internal note.
                            </p>


                            <form onSubmit={updateTicket}>

                                {/* Status */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >

                                        <option value="Open">
                                            Open
                                        </option>

                                        <option value="In Progress">
                                            In Progress
                                        </option>

                                        <option value="Closed">
                                            Closed
                                        </option>

                                    </select>

                                </div>


                                {/* Note */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Add Note
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Write an internal note..."
                                        value={note}
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                    ></textarea>

                                </div>


                                {/* Update Message */}

                                {updateMessage && (

                                    <div className="alert alert-info small">
                                        {updateMessage}
                                    </div>

                                )}


                                {/* Submit */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={updating}
                                >
                                    {updating
                                        ? "Updating..."
                                        : "Update Ticket"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TicketDetails;