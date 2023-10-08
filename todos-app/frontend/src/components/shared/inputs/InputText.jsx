import { string, object } from "prop-types";
import "./inputs.css";

function InputText({ label, register, errors, registerName }) {
  return (
    <>
      <label>{label}</label>
      <input type="text" {...register} />
      {errors[registerName]?.type === "required" && (
        <span className="error">Campo requerido</span>
      )}
      {errors[registerName]?.type === "pattern" && (
        <span className="error">Email inválido</span>
      )}
      {errors[registerName]?.type === "maxLength" && (
        <span className="error">Máximo 30 caracteres</span>
      )}
    </>
  );
}

InputText.propTypes = {
  label: string,
  register: object,
  errors: object,
  registerName: string,
};

export default InputText;
