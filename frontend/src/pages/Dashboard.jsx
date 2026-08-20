import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:5000/api/tickets"
            );

            setTickets(response.data);

        } catch (err) {
            console.error(err);
            setError("Failed to load tickets.");

        } finally {
            setLoading(false);
        }
    };

    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                ticket.ticket_id?.toLowerCase().includes(searchText) ||
                ticket.customer_name?.toLowerCase().includes(searchText) ||
                ticket.customer_email?.toLowerCase().includes(searchText) ||
                ticket.subject?.toLowerCase().includes(searchText);

            const matchesStatus =
                status === "All" ||
                ticket.status === status;

            return matchesSearch && matchesStatus;
        });

    }, [tickets, search, status]);


    const totalTickets = tickets.length;

    const openTickets = tickets.filter(
        (ticket) => ticket.status === "Open"
    ).length;

    const inProgressTickets = tickets.filter(
        (ticket) => ticket.status === "In Progress"
    ).length;

    const closedTickets = tickets.filter(
        (ticket) => ticket.status === "Closed"
    ).length;


    const getStatusClass = (ticketStatus) => {

        switch (ticketStatus) {

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


    return (
        <div className="dashboard-page">

            <div className="container py-4 py-md-5">

                {/* Header */}

                <div className="dashboard-header mb-4">

                    <div>

                        <h1 className="fw-bold mb-1">
                            Support Dashboard
                        </h1>

                        <p className="text-muted mb-0">
                            Manage and track customer support tickets.
                        </p>

                    </div>

                    <Link
                        to="/new-ticket"
                        className="btn btn-primary dashboard-new-ticket"
                    >
                        + New Ticket
                    </Link>

                </div>


                {/* Statistics */}

                <div className="row g-3 mb-4">

                    <div className="col-6 col-lg-3">

                        <div className="stat-card">

                            <span className="stat-label">
                                Total Tickets
                            </span>

                            <h2>
                                {totalTickets}
                            </h2>

                        </div>

                    </div>


                    <div className="col-6 col-lg-3">

                        <div className="stat-card">

                            <span className="stat-label">
                                Open
                            </span>

                            <h2>
                                {openTickets}
                            </h2>

                        </div>

                    </div>


                    <div className="col-6 col-lg-3">

                        <div className="stat-card">

                            <span className="stat-label">
                                In Progress
                            </span>

                            <h2>
                                {inProgressTickets}
                            </h2>

                        </div>

                    </div>


                    <div className="col-6 col-lg-3">

                        <div className="stat-card">

                            <span className="stat-label">
                                Closed
                            </span>

                            <h2>
                                {closedTickets}
                            </h2>

                        </div>

                    </div>

                </div>


                {/* Filters */}

                <div className="filter-card mb-4">

                    <div className="row g-3">

                        <div className="col-md-8">

                            <label className="form-label fw-semibold">
                                Search Tickets
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by ticket ID, customer, email or subject..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <div className="col-md-4">

                            <label className="form-label fw-semibold">
                                Filter by Status
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >

                                <option value="All">
                                    All
                                </option>

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

                    </div>

                </div>


                {/* Tickets */}

                <div className="tickets-card">

                    <div className="tickets-card-header">

                        <h4 className="mb-0">
                            Tickets
                        </h4>

                        <span className="text-muted">
                            {filteredTickets.length} ticket(s)
                        </span>

                    </div>


                    {loading && (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                            </div>

                            <p className="mt-3 mb-0 text-muted">
                                Loading tickets...
                            </p>

                        </div>

                    )}


                    {error && !loading && (

                        <div className="alert alert-danger m-3">

                            {error}

                            <button
                                className="btn btn-sm btn-outline-danger ms-3"
                                onClick={fetchTickets}
                            >
                                Retry
                            </button>

                        </div>

                    )}


                    {!loading &&
                        !error &&
                        filteredTickets.length === 0 && (

                            <div className="empty-state">

                                <h5>
                                    No tickets found
                                </h5>

                                <p className="text-muted">
                                    Try changing your search or filter.
                                </p>

                            </div>

                        )}


                    {!loading &&
                        !error &&
                        filteredTickets.length > 0 && (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead>

                                        <tr>

                                            <th>
                                                Ticket ID
                                            </th>

                                            <th>
                                                Customer
                                            </th>

                                            <th>
                                                Subject
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Created
                                            </th>

                                            <th></th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredTickets.map((ticket) => (

                                            <tr key={ticket.ticket_id}>

                                                <td>

                                                    <strong>
                                                        {ticket.ticket_id}
                                                    </strong>

                                                </td>


                                                <td>

                                                    <div className="customer-name">
                                                        {ticket.customer_name}
                                                    </div>

                                                    <small className="text-muted">
                                                        {ticket.customer_email}
                                                    </small>

                                                </td>


                                                <td>
                                                    {ticket.subject}
                                                </td>


                                                <td>

                                                    <span
                                                        className={`status-badge ${getStatusClass(
                                                            ticket.status
                                                        )}`}
                                                    >
                                                        {ticket.status}
                                                    </span>

                                                </td>


                                                <td>

                                                    <small>
                                                        {new Date(
                                                            ticket.created_at
                                                        ).toLocaleDateString()}
                                                    </small>

                                                </td>


                                                <td>

                                                    <Link
                                                        to={`/tickets/${ticket.ticket_id}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        View
                                                    </Link>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;