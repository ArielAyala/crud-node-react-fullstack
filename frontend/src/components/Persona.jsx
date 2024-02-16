import { useEffect, useState } from "react";
import { getPersonas } from "../api/persona.service";
import { Modal, Button } from "react-bootstrap";

const Persona = () => {
  const [personas, setPersonas] = useState([]);
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(() => {
    getPersonas()
      .then((response) => {
        setPersonas(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="hidden" id="id" />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Nombre:
              </span>
            </div>
            <input type="text" className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="row justify-content-between">
          <div className="col">
            <h3>Personas</h3>
          </div>
          <div className="col-auto">
            <Button variant="primary" onClick={handleShowModal}>
              Registrar nueva persona
            </Button>
          </div>
        </div>
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
                  <button className="btn btn-warning">
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  &nbsp;
                  <button className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
    </>
  );
};

export default Persona;
