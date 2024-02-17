import PropTypes from "prop-types";
import Navbar from './Navbar'

const Layout = ({ children }) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
