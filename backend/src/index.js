import express from "express";
import { PORT } from "./config.js";

import personaRoutes from "./routes/persona.routes.js";
import habitacionRoutes from "./routes/habitacion.routes.js";

const app = express();
app.use(express.json());

app.use("/api", personaRoutes);
app.use("/api", habitacionRoutes);

app.use((req, res) => {
  res.status(400).json({
    message: "Ruta no encontrada",
  });
});

app.listen(PORT);

console.log("Server running");
