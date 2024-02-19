import express from "express";
import cors from "cors";

import { PORT } from "./config.js";

import personaRoutes from "./routes/persona.routes.js";
import habitacionRoutes from "./routes/habitacion.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";

const app = express();

app.use(
  cors({
    origin: "https://arielayala.github.io",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", personaRoutes);
app.use("/api", habitacionRoutes);
app.use("/api", reservaRoutes);

app.use((req, res) => {
  res.status(400).json({
    message: "Ruta no encontrada",
  });
});

app.listen(PORT);

console.log("Server running");
