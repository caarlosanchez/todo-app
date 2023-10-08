import PopUp from "reactjs-popup";
import { bool, func } from "prop-types";

import "./error-pop-up.css";

function ErrorPopUp({ open, onClose }) {
  return (
    <PopUp open={open} onClose={onClose}>
      <div className="modal">
        <h3>Lo sentimos</h3>
        <p>Inténtalo de nuevo más tarde</p>
        <button className="close" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </PopUp>
  );
}

ErrorPopUp.propTypes = {
  open: bool,
  onClose: func,
};

export default ErrorPopUp;
