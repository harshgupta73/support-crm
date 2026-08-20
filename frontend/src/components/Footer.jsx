import "./Footer.css";

function Footer() {
    return (
        <footer className="footer bg-dark text-white">
            <div className="container">

                <div className="row align-items-center">

                    <div className="col-md-6 text-center text-md-start">
                        <h6 className="mb-1">
                            Support CRM
                        </h6>

                        <p className="mb-0 text-secondary">
                            Customer support ticket management system
                        </p>
                    </div>

                    <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                        <p className="mb-0 text-secondary">
                            © {new Date().getFullYear()} Support CRM.
                            All rights reserved.
                        </p>
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;