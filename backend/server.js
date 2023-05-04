const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const especialidadRoutes = require("./routes/especialidadRoutes");
const empresaRoutes = require("./routes/empresaRoutes");
const medicoRoutes = require("./routes/medicoRoutes");
const consultorioRoutes = require("./routes/consultorioRoutes");
const medicoEspecialidadRoutes = require("./routes/medicoEspecialidadRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const registroPacienteRoutes = require("./routes/registroPacienteRoutes");
const medicoCalificacionRoutes = require("./routes/medicoCalificacionRoutes");
const horarioRoutes = require("./routes/horarioRoutes");
const citaRoutes = require("./routes/citaRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/v1/logout", (req, res) => {
  const COOKIE_OPTIONS = {
    path: "/",
  };
  res.clearCookie("jwt", COOKIE_OPTIONS);
  return res.status(200).send("Deleting cookie");
});
app.use("/api/v1/especialidad", especialidadRoutes);
app.use("/api/v1/empresa", empresaRoutes);
app.use("/api/v1/medico", medicoRoutes);
app.use("/api/v1/consultorio", consultorioRoutes);
app.use("/api/v1/medico-especialidad", medicoEspecialidadRoutes);
app.use("/api/v1/paciente", pacienteRoutes);
app.use("/api/v1/registro-paciente", registroPacienteRoutes);
app.use("/api/v1/medico-calificacion", medicoCalificacionRoutes);
app.use("/api/v1/horario", horarioRoutes);
app.use("/api/v1/cita", citaRoutes);
app.use("/api/v1/auth", authRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor iniciado en el puerto ${PORT}. http://localhost:${PORT}/`
  );
});
