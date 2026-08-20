import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./CreateTicket.css";

function CreateTicket() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !formData.customer_name ||
            !formData.customer_email ||
            !formData.subject ||
            !formData.description
        ) {
            setError("Please fill in all fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/api/tickets",
                formData
            );

            navigate(
                `/tickets/${response.data.ticket_id}`
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to create ticket."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="create-ticket-page">

            <div className="container py-4 py-md-5">

                <div className="create-ticket-header">

                    <Link
                        to="/tickets"
                        className="back-link"
                    >
                        ← Back to Tickets
                    </Link>

                    <h1 className="fw-bold mt-3 mb-1">
                        Create New Ticket
                    </h1>

                    <p className="text-muted">
                        Create a support ticket for a customer issue.
                    </p>

                </div>

                <div className="create-ticket-card">

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Customer Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="customer_name"
                                    placeholder="Enter customer name"
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Customer Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="customer_email"
                                    placeholder="customer@example.com"
                                    value={formData.customer_email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    placeholder="Enter issue subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="7"
                                    placeholder="Describe the customer's issue..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                            </div>

                            <div className="col-12">

                                <div className="create-actions">

                                    <Link
                                        to="/tickets"
                                        className="btn btn-outline-secondary"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "Create Ticket"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreateTicket;