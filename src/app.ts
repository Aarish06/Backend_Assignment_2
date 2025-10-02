import express from "express";
import morgan from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Default root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.get("/health", (req, res) => {
    res.json({
        status: 200,
        text: "Server is healthy"});
});

export default app;
