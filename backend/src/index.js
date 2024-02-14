import express from "express";
import { PORT } from "./config.js";

import personasRoutes from "./routes/persona.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api", personasRoutes);

app.use((req, res) => {
  res.status(400).json({
    message: "Ruta no encontrada",
  });
});

app.listen(PORT);

console.log("Server  running");
