import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import TicketDetails from "./pages/TicketDetails";
import CreateTicket from "./pages/CreateTicket";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="app-container">

            <Navbar />

            <main className="main-content">
                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/tickets" element={<Dashboard />} />

                    <Route
                        path="/tickets/:ticketId"
                        element={<TicketDetails />}
                    />

                    <Route
                        path="/new-ticket"
                        element={<CreateTicket />}
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>
            </main>

            <Footer />

        </div>
    );
}

export default App;