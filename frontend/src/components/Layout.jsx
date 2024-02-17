import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0"> 
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Reservas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/persona" className="nav-link">
                  Personas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/habitacion" className="nav-link">
                  Habitaciones
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
