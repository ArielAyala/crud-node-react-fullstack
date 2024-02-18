import { useEffect, useState } from "react";
import {
  getAllHabitaciones,
  createHabitacion,
  updateHabitacion,
  deleteHabitacion,
} from "../api/habitacion.service";
import { Operation } from "../utils/operations";
import { showAlert, ALERT_ICON, showConfirDeleteDialog } from "../utils/alert";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { LIMITES_RESERVA } from "../config";

const Habitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [show, setShow] = useState(false);
  const [operationModal, setOperationModal] = useState(1);
  const [modalTitle, setModalTitle] = useState("");

  const [id, setId] = useState("");
  const [habitacionPiso, setHabitacionPiso] = useState(1);
  const [habitacionNro, setHabitacionNro] = useState(1);
  const [cantCamas, setCantCamas] = useState(1);
  const [tieneTelevision, setTieneTelevision] = useState(false);
  const [tieneFrigobar, setTieneFrigobar] = useState(false);

  // prettier-ignore
  const {register, handleSubmit, formState: { errors }, reset} = useForm();

  useEffect(() => {
    getHabitaciones();
  }, []);

  const getHabitaciones = () => {
    getAllHabitaciones()
      .then((response) => {
        setHabitaciones(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => setShow(false);

  const openModal = (
    op,
    id,
    habitacionPiso,
    habitacionNro,
    cantCamas,
    tieneTelevision,
    tieneFrigobar
  ) => {
    setShow(true);
    reset();
    setOperationModal(op);

    if (op === Operation.CREATE) {
      setModalTitle("Registrar habitación");
      setId("");
      setHabitacionPiso(1);
      setHabitacionNro(1);
      setCantCamas(1);
      setTieneTelevision(false);
      setTieneFrigobar(false);
    } else if (op === Operation.EDIT) {
      setModalTitle("Editar habitación");
      setId(id);
      setHabitacionPiso(habitacionPiso);
      setHabitacionNro(habitacionNro);
      setCantCamas(cantCamas);
      setTieneTelevision(tieneTelevision);
      setTieneFrigobar(tieneFrigobar);

      window.setTimeout(() => {
        document.getElementById("habitacionPiso").focus();
      }, 500);
    }
  };

  const onSubmit = async () => {
    const habitacionBody = {
      habitacionPiso,
      habitacionNro,
      cantCamas,
      tieneTelevision,
      tieneFrigobar,
    };

    try {
      if (operationModal === Operation.CREATE) {
        const createHabitacionResponse = await createHabitacion(habitacionBody);
        if (createHabitacionResponse) {
          closeModal();
          showAlert("Habitación registrada correctamente", ALERT_ICON.Success);
          getHabitaciones();
        }
      } else if (operationModal === Operation.EDIT) {
        const updateHabitacionResponse = await updateHabitacion(
          id,
          habitacionBody
        );
        if (updateHabitacionResponse) {
          closeModal();
          showAlert("Habitación actualizada correctamente", ALERT_ICON.Success);
          getHabitaciones();
        }
      }
    } catch (error) {
      showAlert("Hubo un error", ALERT_ICON.Error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await showConfirDeleteDialog(
      "¿Está seguro de eliminar esta habitación?"
    );
    if (confirmDelete.isConfirmed) {
      try {
        await deleteHabitacion(id);
        showAlert("Habitación eliminada correctamente", ALERT_ICON.Success);
        getHabitaciones();
      } catch (error) {
        showAlert("Hubo un error al eliminar la habitación", ALERT_ICON.Error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="row justify-content-between mb-4 mt-4">
          <div className="col">
            <h3>Habitaciones</h3>
          </div>
          <div className="col-auto">
            <Button
              variant="primary"
              onClick={() => openModal(Operation.CREATE)}
            >
              Registrar nueva habitación
            </Button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Piso</th>
              <th scope="col">Número</th>
              <th scope="col">Camas</th>
              <th scope="col">Televisión</th>
              <th scope="col">Frigobar</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((habitacion, i) => (
              <tr key={i}>
                <td>{habitacion.habitacionpiso}</td>
                <td>{habitacion.habitacionnro}</td>
                <td>{habitacion.cantcamas}</td>
                <td>{habitacion.tienetelevision ? "Sí" : "No"}</td>
                <td>{habitacion.tienefrigobar ? "Sí" : "No"}</td>
                <td>
                  <EditButton
                    onClick={() =>
                      openModal(
                        Operation.EDIT,
                        habitacion.id,
                        habitacion.habitacionpiso,
                        habitacion.habitacionnro,
                        habitacion.cantcamas,
                        habitacion.tienetelevision,
                        habitacion.tienefrigobar
                      )
                    }
                  />
                  &nbsp;
                  <DeleteButton onClick={() => handleDelete(habitacion.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="hidden" id="id" value={id} />
            <div className="form-group mb-3">
              <label htmlFor="habitacionPiso">Piso</label>
              <input
                {...register("habitacionPiso", {
                  required: "El piso es requerido",
                  validate: {
                    greaterThanZero: (value) =>
                      parseInt(value, 10) > 0 || "El piso debe ser mayor a 0",
                    lessThanOrEqual: (value) =>
                      parseInt(value, 10) <= LIMITES_RESERVA.MaxPisos ||
                      "El piso debe ser menor o igual a " +
                        LIMITES_RESERVA.MaxPisos,
                  },
                })}
                type="number"
                className="form-control"
                id="habitacionPiso"
                value={habitacionPiso}
                onChange={(e) =>
                  setHabitacionPiso(
                    e.target.value === "" ? "" : parseInt(e.target.value, 10)
                  )
                }
                required
                min={1}
                max={10}
              />
              <div
                className={`invalid-feedback${
                  errors.habitacionPiso ? " d-block" : ""
                }`}
              >
                {errors.habitacionPiso?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="habitacionNro">Número</label>
              <input
                {...register("habitacionNro", {
                  required: "El número de habitación es requerido",
                  validate: {
                    greaterThanZero: (value) =>
                      parseInt(value, 10) > 0 ||
                      "El número de habitación debe ser mayor a 0",
                    lessThanOrEqual: (value) =>
                      parseInt(value, 10) <= LIMITES_RESERVA.MaxHabitaciones ||
                      `El número de habitación debe ser menor o igual a ${LIMITES_RESERVA.MaxHabitaciones}`,
                  },
                })}
                type="number"
                className="form-control"
                id="habitacionNro"
                value={habitacionNro}
                onChange={(e) =>
                  setHabitacionNro(
                    e.target.value === "" ? "" : parseInt(e.target.value, 10)
                  )
                }
                required
                min={1}
                max={20}
              />
              <div
                className={`invalid-feedback${
                  errors.habitacionNro ? " d-block" : ""
                }`}
              >
                {errors.habitacionNro?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cantCamas">Cantidad de Camas</label>
              <input
                {...register("cantCamas", {
                  required: "La cantidad de camas es requerida",
                  validate: {
                    greaterThanZero: (value) =>
                      parseInt(value, 10) > 0 ||
                      "La cantidad de camas debe ser mayor a 0",
                    lessThanOrEqual: (value) =>
                      parseInt(value, 10) <= LIMITES_RESERVA.MaxCamas ||
                      `La cantidad de camas debe ser menor o igual a ${LIMITES_RESERVA.MaxCamas}`,
                  },
                })}
                type="number"
                className="form-control"
                id="cantCamas"
                value={cantCamas}
                onChange={(e) =>
                  setCantCamas(
                    e.target.value === "" ? "" : parseInt(e.target.value, 10)
                  )
                }
                required
                min={1}
                max={4}
              />
              <div
                className={`invalid-feedback${
                  errors.cantCamas ? " d-block" : ""
                }`}
              >
                {errors.cantCamas?.message}
              </div>
            </div>
            <div className="form-check mb-3">
              <input
                {...register("tieneTelevision")}
                type="checkbox"
                className="form-check-input"
                id="tieneTelevision"
                checked={tieneTelevision}
                onChange={(e) => setTieneTelevision(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="tieneTelevision">
                ¿Tiene televisión?
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                {...register("tieneFrigobar")}
                type="checkbox"
                className="form-check-input"
                id="tieneFrigobar"
                checked={tieneFrigobar}
                onChange={(e) => setTieneFrigobar(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="tieneFrigobar">
                ¿Tiene frigobar?
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Habitacion;
