import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

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

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
