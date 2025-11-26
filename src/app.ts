import routes from "./routes";
import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use("/api", routes);
app.use("/admin", express.static("public/admin"));

export default app;
