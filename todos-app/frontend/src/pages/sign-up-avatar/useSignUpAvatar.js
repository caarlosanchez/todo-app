import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function useSignUpAvatar() {
  const [passwordError, setPasswordError] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  // Variable de estado para previsualizar la foto seleccionada
  const [avatarImg, setAvatarImg] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { registerUserAvatar } = useAuth();

  const onSubmit = async (data) => {
    if (data.password !== data["repeat-password"]) {
      // IMPORTANTE: Hacemos return porque sino se ejecutaría el siguiente código
      return setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // Creamos un objeto de formData vacío
    const formData = new FormData();
    // Añadimos uno a uno los campos que necesitamos en backend
    formData.append("file", data.file[0]);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("gender", data.gender);
    formData.append("email", data.email);
    formData.append("password", data.password);

    // Agregamos el header para enviar form-data
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      // Llamamos el servicio del signup con los parámetros esperados
      await registerUserAvatar(formData, config);
      // Navegamos al dashboard
      navigate("/");
    } catch (error) {
      // Mostraremos nuestro pop up genérico de error
      setErrorPopUp(true);
    }
  };

  const handleOnChangeAvatar = (e) => {
    const target = e.target.files[0];
    const url = URL.createObjectURL(target);
    setAvatarImg(url);
  };

  return {
    state: { register, errors, passwordError, errorPopUp, avatarImg },
    actions: { handleSubmit, onSubmit, setErrorPopUp, handleOnChangeAvatar },
  };
}

export default useSignUpAvatar;
