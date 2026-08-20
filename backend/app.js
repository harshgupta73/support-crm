const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const ticketRouter = require("./routes/ticketRoutes");
const noteRouter = require("./controllers/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/tickets", ticketRouter);
app.use("/api/notes", noteRouter);
app.get("/", (req, res) => {
    res.json({
        message: "Support CRM API is running"
    });
});

const PORT = process.env.PORT || 5000;




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});