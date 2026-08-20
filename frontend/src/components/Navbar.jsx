import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold"
                >
                    Support CRM
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#supportNavbar"
                    aria-controls="supportNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="supportNavbar"
                >
                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <NavLink
                                to="/tickets"
                                className="nav-link"
                            >
                                Tickets
                            </NavLink>
                        </li>

                        <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                            <Link
                                to="/new-ticket"
                                className="btn btn-primary"
                            >
                                + New Ticket
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;