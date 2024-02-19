import { useEffect, useState } from "react";
import {
  getAllReservas,
  createReserva,
  updateReserva,
  deleteReserva,
} from "../api/reserva.service";
import {
  getAllHabitaciones,
  getHabitacionesDisponiblesByDateRange,
} from "../api/habitacion.service";
import { getAllPersonas } from "../api/persona.service";
import { Operation } from "../utils/operations";
import { showAlert, ALERT_ICON, showConfirDeleteDialog } from "../utils/alert";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { PRICE_DAY } from "../config";
import {
  format,
  addDays,
  startOfDay,
  differenceInCalendarDays,
} from "date-fns";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { formatCurrency } from "../utils/formatNumber";
import Loading from "../components/Loading";

const Reserva = () => {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [show, setShow] = useState(false);
  const [operationModal, setOperationModal] = useState(1);
  const [modalTitle, setModalTitle] = useState("");

  const [id, setId] = useState("");
  const [fechaReserva, setFechaReserva] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState(addDays(new Date(), 1));
  const [fechaSalida, setFechaSalida] = useState("");
  const [habitacionId, setHabitacionId] = useState("");
  const [personaId, setPersonaId] = useState("");

  const [montoReserva, setMontoReserva] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [gettingHabitaciones, setGettingHabitaciones] = useState(false);

  // prettier-ignore
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    getReservas();
    getPersonas();
  }, []);

  useEffect(() => {
    if (fechaEntrada && fechaSalida) {
      if (operationModal === Operation.CREATE) {
        getHabitacionesDisponibles();
      }
      calcularMontoReserva();
    }
  }, [fechaEntrada, fechaSalida]);

  const getReservas = () => {
    setLoading(true);
    getAllReservas()
      .then((response) => {
        setReservas(response);
      })
      .catch((error) => {
        console.error(error);
        showAlert("Hubo un error al obtener las reservas", ALERT_ICON.Error);
      })
      .finally(() => setLoading(false));
  };

  const getHabitaciones = async () => {
    try {
      const response = await getAllHabitaciones();
      setHabitaciones(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getHabitacionesDisponibles = () => {
    setGettingHabitaciones(true);
    getHabitacionesDisponiblesByDateRange(fechaEntrada, fechaSalida)
      .then((response) => {
        setHabitaciones(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setGettingHabitaciones(false));
  };

  const getPersonas = () => {
    getAllPersonas()
      .then((response) => {
        setPersonas(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => setShow(false);

  const openModal = async (
    op,
    id,
    fechaReserva,
    fechaEntrada,
    fechaSalida,
    habitacionId,
    personaId,
    montoReserva
  ) => {
    setShow(true);
    reset();
    setOperationModal(op);

    if (op === Operation.CREATE) {
      setModalTitle("Registrar nueva reserva");
      setId("");
      setFechaReserva("");
      setFechaEntrada("");
      setFechaSalida("");
      setHabitacionId("");
      setPersonaId("");
      setMontoReserva(0);
    } else if (op === Operation.EDIT) {
      setModalTitle("Editar reserva");
      setId(id);
      setFechaReserva(fechaReserva);
      setFechaEntrada(new Date(fechaEntrada).toISOString().split("T")[0]);
      setFechaSalida(new Date(fechaSalida).toISOString().split("T")[0]);

      await getHabitaciones();
      setHabitacionId(habitacionId);
      setPersonaId(personaId);
      setMontoReserva(montoReserva);

      window.setTimeout(() => {
        document.getElementById("fechaEntrada").focus();
      }, 500);
    }
  };

  const onSubmit = async () => {
    setSending(true);
    const reservaBody = {
      fechaEntrada: fechaEntrada,
      fechaSalida: fechaSalida,
      habitacionId,
      personaId,
    };

    try {
      if (operationModal === Operation.CREATE) {
        const createReservaResponse = await createReserva(reservaBody);
        if (createReservaResponse) {
          closeModal();
          showAlert("Reserva registrada correctamente", ALERT_ICON.Success);
          getReservas();
        }
      } else if (operationModal === Operation.EDIT) {
        const updateReservaResponse = await updateReserva(id, reservaBody);
        if (updateReservaResponse) {
          closeModal();
          showAlert("Reserva actualizada correctamente", ALERT_ICON.Success);
          getReservas();
        }
      }
    } catch (error) {
      let errorMessage = "Hubo un error";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      showAlert(errorMessage, ALERT_ICON.Error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await showConfirDeleteDialog(
      "¿Está seguro de eliminar esta reserva?"
    );
    if (confirmDelete.isConfirmed) {
      try {
        await deleteReserva(id);
        showAlert("Reserva eliminada correctamente", ALERT_ICON.Success);
        getReservas();
      } catch (error) {
        showAlert("Hubo un error al eliminar la reserva", ALERT_ICON.Error);
      }
    }
  };

  const calcularMontoReserva = () => {
    if (fechaEntrada && fechaSalida) {
      const fechaEntradaNormalized = startOfDay(new Date(fechaEntrada));
      const fechaSalidaNormalized = startOfDay(new Date(fechaSalida));
      const days = differenceInCalendarDays(
        fechaSalidaNormalized,
        fechaEntradaNormalized
      );
      const montoCalculado = days * PRICE_DAY;

      setMontoReserva(montoCalculado);
    }
  };

  return (
    <>
      <div>
        <div className="row justify-content-between mb-4 mt-4">
          <div className="col">
            <h3>Reservas</h3>
          </div>
          <div className="col-auto">
            <Button
              variant="primary"
              onClick={() => openModal(Operation.CREATE)}
            >
              Registrar nueva reserva
            </Button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Persona</th>
                <th scope="col">Habitación</th>
                <th scope="col">Piso</th>
                <th scope="col" className="text-center">
                  Fecha Reserva
                </th>
                <th scope="col" className="text-center">
                  Fecha Entrada
                </th>
                <th scope="col" className="text-center">
                  Fecha Salida
                </th>
                <th scope="col" className="text-end">
                  Monto Reserva
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, i) => (
                <tr key={i}>
                  <td>{reserva.nombrecompleto}</td>
                  <td className="text-center">{reserva.habitacionnro}</td>
                  <td className="text-center">{reserva.habitacionpiso}</td>
                  <td className="text-center">
                    {format(new Date(reserva.fechareserva), "dd-MM-yyyy HH:mm")}
                  </td>
                  <td className="text-center">
                    {format(new Date(reserva.fechaentrada), "dd-MM-yyyy")}
                  </td>
                  <td className="text-center">
                    {reserva.fechasalida
                      ? format(new Date(reserva.fechasalida), "dd-MM-yyyy")
                      : ""}
                  </td>
                  <td className="text-end">
                    <div className="me-3">
                      {formatCurrency(reserva.montoreserva)}
                    </div>
                  </td>
                  <td>
                    <EditButton
                      variant="warning"
                      onClick={() =>
                        openModal(
                          Operation.EDIT,
                          reserva.id,
                          reserva.fechareserva,
                          reserva.fechaentrada,
                          reserva.fechasalida,
                          reserva.habitacionid,
                          reserva.personaid,
                          reserva.montoreserva
                        )
                      }
                    />{" "}
                    <DeleteButton
                      variant="danger"
                      onClick={() => handleDelete(reserva.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{fechaEntrada}</h3>
          <form>
            <input type="hidden" id="id" value={id} />
            {operationModal === Operation.EDIT && (
              <div className="form-group mb-3">
                <label htmlFor="fechaReserva">Fecha Reserva</label>
                <input
                  type="text"
                  className="form-control"
                  id="fechaReserva"
                  value={format(new Date(fechaReserva), "dd-MM-yyyy HH:mm")}
                  readOnly
                  disabled
                />
              </div>
            )}
            <div className="form-group mb-3">
              <label htmlFor="fechaEntrada">Fecha Entrada</label>
              <input
                {...register("fechaEntrada", {
                  required: "La fecha de entrada es requerida",
                  validate: (value) => {
                    const valor = addDays(value, 1);
                    const days = differenceInCalendarDays(
                      startOfDay(valor),
                      startOfDay(new Date())
                    );
                    return (
                      days > 0 ||
                      "La fecha de entrada debe ser al menos un día después de la fecha actual"
                    );
                  },
                })}
                type="date"
                className="form-control"
                id="fechaEntrada"
                value={fechaEntrada}
                onChange={(e) => setFechaEntrada(e.target.value)}
                required
              />
              <div
                className={`invalid-feedback${
                  errors.fechaEntrada ? " d-block" : ""
                }`}
              >
                {errors.fechaEntrada?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="fechaSalida">Fecha Salida</label>
              <input
                {...register("fechaSalida", {
                  required: "La fecha de salida es requerida",
                  validate: (value) => {
                    const fechaEntradaNormalized = startOfDay(fechaEntrada);
                    const fechaSalidaNormalized = startOfDay(new Date(value));
                    const days = differenceInCalendarDays(
                      fechaSalidaNormalized,
                      fechaEntradaNormalized
                    );

                    return (
                      days > 0 ||
                      "La fecha de salida debe ser mayor a la fecha de entrada"
                    );
                  },
                })}
                type="date"
                className="form-control"
                id="fechaSalida"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
              />
              <div
                className={`invalid-feedback${
                  errors.fechaSalida ? " d-block" : ""
                }`}
              >
                {errors.fechaSalida?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="habitacionId">Habitación</label>
              <select
                {...register("habitacionId", {
                  required: "La habitación es requerida",
                })}
                className="form-control"
                id="habitacionId"
                value={habitacionId}
                onChange={(e) => setHabitacionId(e.target.value)}
                required
                disabled={
                  fechaSalida === "" ||
                  fechaEntrada === "" ||
                  gettingHabitaciones
                }
              >
                <option value="">
                  {gettingHabitaciones
                    ? "Obteniendo habitaciones"
                    : "Seleccionar habitación"}
                </option>
                {habitaciones.map((habitacion) => (
                  <option key={habitacion.id} value={habitacion.id}>
                    {habitacion.habitacionnro} - Piso{" "}
                    {habitacion.habitacionpiso}
                  </option>
                ))}
              </select>
              <div
                className={`invalid-feedback${
                  errors.habitacionId ? " d-block" : ""
                }`}
              >
                {errors.habitacionId?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="personaId">Persona</label>
              <select
                {...register("personaId", {
                  required: "La persona es requerida",
                })}
                className="form-control"
                id="personaId"
                value={personaId}
                onChange={(e) => setPersonaId(e.target.value)}
                required
              >
                <option value="">Seleccionar Persona</option>
                {personas.map((persona) => (
                  <option key={persona.id} value={persona.id}>
                    {persona.nombrecompleto}
                  </option>
                ))}
              </select>
              <div
                className={`invalid-feedback${
                  errors.personaId ? " d-block" : ""
                }`}
              >
                {errors.personaId?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="montoReserva">
                Monto Reserva: <b>{formatCurrency(montoReserva)}</b>
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={sending}
          >
            {sending ? "Guardando" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reserva;
