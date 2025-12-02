import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";

import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.use(express.json());
// public
app.use("/api", publicRoutes);

// admin
app.use("/api/admin", adminRoutes)
app.use("/admin", express.static("public/admin"));

export default app;
