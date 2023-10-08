import axios from "axios";

export const login = (email, password) => {
  return axios.post("http://localhost:8000/api/login", {
    email,
    password,
  });
};

export const signUp = (name, surname, gender, email, password) => {
  return axios.post("http://localhost:8000/api/account", {
    name,
    surname,
    gender,
    email,
    password,
  });
};

export const signUpAvatar = (formData, config) => {
  return axios.post(
    "http://localhost:8000/api/account/avatar",
    formData,
    config
  );
};

export const updateAccount = (formData, config) => {
  return axios.put("http://localhost:8000/api/account", formData, config);
};
