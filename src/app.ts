import routes from "./routes";
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());
app.use("/api", routes);

export default app;
