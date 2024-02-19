import { useEffect, useState } from "react";
import {
  getAllPersonas,
  createPersona,
  updatePersona,
  deletePersona,
} from "../api/persona.service";
import { Modal, Button } from "react-bootstrap";
import { Operation } from "../utils/operations";
import { showAlert, ALERT_ICON, showConfirDeleteDialog } from "../utils/alert";
import { useForm } from "react-hook-form";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import Loading from "../components/Loading";

const Persona = () => {
  
  const [personas, setPersonas] = useState([]);
  const [show, setShow] = useState(false);
  const [operationModal, setOperationModal] = useState(1);
  const [modalTitle, setModalTitle] = useState("");

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // prettier-ignore
  const {register, handleSubmit, formState: { errors }, reset} = useForm();

  useEffect(() => {
    getPersonas();
  }, []);

  const getPersonas = () => {
    setLoading(true);
    getAllPersonas()
      .then((response) => {
        setPersonas(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const closeModal = () => setShow(false);

  const openModal = (op, id, nombreCompleto, documento, telefono, correo) => {
    setShow(true);
    reset();
    setOperationModal(op);

    if (op === Operation.CREATE) {
      setModalTitle("Registrar persona");
      setId("");
      setNombre("");
      setDocumento("");
      setTelefono("");
      setCorreo("");
    } else if (op === Operation.EDIT) {
      setModalTitle("Editar persona");
      setId(id);
      setNombre(nombreCompleto);
      setDocumento(documento);
      setTelefono(telefono);
      setCorreo(correo ?? "");

      window.setTimeout(() => {
        document.getElementById("nombre").focus();
      }, 500);
    }
  };

  const onSubmit = async () => {
    setSending(true);
    const personaBody = {
      nombre: nombre.trim(),
      documento: documento.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
    };

    try {
      if (operationModal === Operation.CREATE) {
        const createPersonaResponse = await createPersona(personaBody);
        if (createPersonaResponse) {
          closeModal();
          showAlert("Persona registrada correctamente", ALERT_ICON.Success);
          getPersonas();
        }
      } else if (operationModal === Operation.EDIT) {
        const updatePersonaResponse = await updatePersona(id, personaBody);
        if (updatePersonaResponse) {
          closeModal();
          showAlert("Persona actualizada correctamente", ALERT_ICON.Success);
          getPersonas();
        }
      }
    } catch (error) {
      showAlert("Hubo un error", ALERT_ICON.Error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await showConfirDeleteDialog(
      "¿Está seguro de eliminar esta persona?"
    );
    if (confirmDelete.isConfirmed) {
      try {
        await deletePersona(id);
        showAlert("Persona eliminada correctamente", ALERT_ICON.Success);
        getPersonas();
      } catch (error) {
        showAlert("Hubo un error al eliminar la persona", ALERT_ICON.Error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="row justify-content-between mt-4">
          <div className="col">
            <h3>Personas</h3>
          </div>
          <div className="col-auto">
            <Button
              variant="primary"
              onClick={() => openModal(Operation.CREATE)}
            >
              Registrar nueva persona
            </Button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Documento</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Correo</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {personas.map((persona, i) => (
                <tr key={i}>
                  <td>{persona.nombrecompleto}</td>
                  <td>{persona.nrodocumento}</td>
                  <td>{persona.telefono}</td>
                  <td>{persona.correo}</td>
                  <td>
                    <EditButton
                      onClick={() =>
                        openModal(
                          Operation.EDIT,
                          persona.id,
                          persona.nombrecompleto,
                          persona.nrodocumento,
                          persona.telefono,
                          persona.correo
                        )
                      }
                    />
                    &nbsp;
                    <DeleteButton onClick={() => handleDelete(persona.id)} />
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
          <form>
            <input type="hidden" id="id" value={id} />
            <div className="form-group mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                {...register("nombre", { required: "El nombre es requerido" })}
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <div
                className={`invalid-feedback${errors.nombre ? " d-block" : ""}`}
              >
                {errors.nombre?.message}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="ci">CI N°</label>
              <input
                {...register("documento", {
                  required: "El numero de documento es requerido",
                })}
                type="texto"
                className="form-control"
                id="ci"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
              <div
                className={`invalid-feedback${
                  errors.documento ? " d-block" : ""
                }`}
              >
                {errors.documento?.message}
              </div>
            </div>
            <div className="form-groupmb-3">
              <label htmlFor="telefono">Teléfono</label>
              <input
                {...register("telefono", {
                  required: "El teléfono es requerido",
                })}
                type="tel"
                className="form-control"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <div
                className={`invalid-feedback${
                  errors.telefono ? " d-block" : ""
                }`}
              >
                {errors.telefono?.message}
              </div>
            </div>
            <div className="form-groupmb-3">
              <label htmlFor="correo">Correo</label>
              <input
                type="mail"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
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

export default Persona;
