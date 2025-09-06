import express from "express";

const app = express();

// import routes
import healthCheckRoutes from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthCheck", healthCheckRoutes);

export default app;
