import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password,
  });
};

const login = ({ email, password }) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.tokenData) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.tokenData));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
