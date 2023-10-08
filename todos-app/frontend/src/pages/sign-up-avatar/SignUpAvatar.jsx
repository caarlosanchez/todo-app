import { EMAIL_REGEX, MAX_LENGTH_STRING } from "../../utils/constants";
import Block from "../../components/shared/block/Block";
import Button from "../../components/shared/button/Button";
import InputText from "../../components/shared/inputs/InputText";
import InputPassword from "../../components/shared/inputs/InputPassword";
import useSignUpAvatar from "./useSignUpAvatar";
import avatar from "../../assets/avatar.png";
import ErrorPopUp from "../../components/shared/error-pop-up/ErrorPopUp";

import "./sign-up-avatar.css";

function SignUpAvatar() {
  const {
    state: { register, errors, passwordError, errorPopUp, avatarImg },
    actions: { handleSubmit, onSubmit, setErrorPopUp, handleOnChangeAvatar },
  } = useSignUpAvatar();

  console.log(avatarImg);

  return (
    <>
      <Block text="Registro">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="avatar-container">
            <img src={avatarImg ? avatarImg : avatar} alt="avatar" />
            <input
              type="file"
              {...register("file", {
                required: true,
              })}
              onChange={handleOnChangeAvatar}
            />
          </div>
          {errors.file?.type === "required" && (
            <span className="error">Campo requerido</span>
          )}
          <InputText
            label="Nombre"
            register={register("name", {
              required: true,
              maxLength: MAX_LENGTH_STRING,
            })}
            errors={errors}
            registerName="name"
          />

          <InputText
            label="Apellido"
            register={register("surname", {
              required: true,
              maxLength: MAX_LENGTH_STRING,
            })}
            errors={errors}
            registerName="surname"
          />

          <InputText
            label="Email"
            register={register("email", {
              required: true,
              pattern: EMAIL_REGEX,
            })}
            errors={errors}
            registerName="email"
          />

          <label>Género</label>
          <select {...register("gender", { required: true })}>
            <option value="">--</option>
            <option value="Female">Mujer</option>
            <option value="Male">Hombre</option>
            <option value="Other">Otro</option>
          </select>
          {errors.gender?.type === "required" && (
            <span className="error">Campo requerido</span>
          )}

          <InputPassword
            label="Contraseña"
            register={register("password", {
              required: true,
              minLength: 8,
            })}
            errors={errors}
            registerName="password"
          />

          <InputPassword
            label="Repite contraseña"
            register={register("repeat-password", {
              required: true,
            })}
            errors={errors}
            registerName="repeat-password"
          />

          {passwordError && (
            <span className="error">Las contraseñas no coinciden</span>
          )}

          <div className="terms-container">
            <input
              type="checkbox"
              {...register("terms", {
                required: true,
              })}
            />
            <label>Acepta términos y condiciones</label>
          </div>
          {errors.terms?.type === "required" && (
            <span className="error">Campo requerido</span>
          )}

          <Button text="Continuar" />
        </form>
      </Block>

      <ErrorPopUp open={errorPopUp} onClose={() => setErrorPopUp(false)} />
    </>
  );
}

export default SignUpAvatar;
