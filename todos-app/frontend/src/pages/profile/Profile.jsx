import { EMAIL_REGEX, MAX_LENGTH_STRING } from "../../utils/constants";
import Block from "../../components/shared/block/Block";
import Button from "../../components/shared/button/Button";
import InputText from "../../components/shared/inputs/InputText";
import useProfile from "./useProfile";
import avatar from "../../assets/avatar.png";
import ErrorPopUp from "../../components/shared/error-pop-up/ErrorPopUp";

import "./profile.css";

function Profile() {
  const {
    state: { register, errors, errorPopUp, avatarImg },
    actions: { handleSubmit, onSubmit, setErrorPopUp, handleOnChangeAvatar },
  } = useProfile();

  return (
    <>
      <Block text="Mi perfil">
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
            <option value="female">Mujer</option>
            <option value="male">Hombre</option>
            <option value="other">Otro</option>
          </select>
          {errors.gender?.type === "required" && (
            <span className="error">Campo requerido</span>
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

export default Profile;
