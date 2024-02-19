
//import JoiValidationError from "./joiValidationError.js";

export default function handleError(error, res) {
  // if (
  //   error instanceof JoiValidationError ||
  //   error.name === "JoiValidationError" ||
  //   (error.details && error.details.length > 0)
  // ) {
  //   //return res.status(400).json({ message: error.message });
  //   return boom.badRequest(error.message);
  // }

  if (error.isBoom) {
    return res.status(error.output.statusCode).json(error.output.payload);
  }

  switch (error.code) {
    case "ValidationError":
      return res.status(400).json({ message: error.errors[0].message });
    case "NotFoundError":
      return res.status(404).json({ message: "No se encontró el recurso" });
    default:
      return res.status(500).json({ message: "Algo salió mal" });
  }
}
