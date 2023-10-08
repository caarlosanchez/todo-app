import { string, func } from "prop-types";
import "./input.css";

function Input({ content, setContent }) {
  return (
    <div className="input-container">
      <label>Añade tu todo</label>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

Input.propTypes = {
  content: string,
  setContent: func,
};

export default Input;
