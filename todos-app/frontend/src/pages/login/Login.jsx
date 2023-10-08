import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/constants";
import Block from "../../components/shared/block/Block";
import Button from "../../components/shared/button/Button";
import InputText from "../../components/shared/inputs/InputText";
import InputPassword from "../../components/shared/inputs/InputPassword";
import { useAuth } from "../../context/authContext";
import ErrorPopUp from "../../components/shared/error-pop-up/ErrorPopUp";

import "./login.css";

function Login() {
  const [errorText, setErrorText] = useState();
  const [errorPopUp, setErrorPopUp] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();

  const onSubmit = async ({ email, password }) => {
    try {
      // Llamamos a nuestra función del cotexto con los parámetros esperados
      await signIn(email, password);
      // Eliminamos el errorText por si existía ya que ahora ha ido bien la petición
      setErrorText(null);
      // Navegamos al dashboard
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 402) {
        // Mostramos mensaje de error genérico
        setErrorText("Email o contraseña no válido");
      }
      // Si algo ha ido mal, mostramos nuestro pop up genérico
      setErrorPopUp(true);
    }
  };

  return (
    <>
      <Block text="Login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            label="Email"
            register={register("email", {
              required: true,
              pattern: EMAIL_REGEX,
            })}
            errors={errors}
            registerName="email"
          />

          <InputPassword
            label="Contraseña"
            register={register("password", {
              required: true,
              minLength: 8,
            })}
            errors={errors}
            registerName="password"
          />

          <span className="error">{errorText}</span>

          <Button text="Continuar" />
        </form>
      </Block>

      <ErrorPopUp open={errorPopUp} onClose={() => setErrorPopUp(false)} />
    </>
  );
}

export default Login;
