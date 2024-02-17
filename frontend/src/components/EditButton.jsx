import PropTypes from "prop-types";

const EditButton = ({ onClick }) => {
  EditButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <button className="btn btn-secondary" onClick={onClick}>
      <i className="fa-solid fa-edit"></i>
    </button>
  );
};

export default EditButton;
