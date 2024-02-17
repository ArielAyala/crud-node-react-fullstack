import PropTypes from "prop-types";

const DeleteButton = ({ onClick }) => {
  DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <button className="btn btn-danger" onClick={onClick}>
      <i className="fa-solid fa-trash"></i>
    </button>
  );
};

export default DeleteButton;
