import api from "../utils/axios";

const register = ({ fname, lname, email, password, role }) => {
  return api.post("/register", {
    fname,
    lname,
    email,
    password,
    role,
  });
};

const login = ({ email, password }) => {
  return api
    .post("/login", {
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

const forgotPassword = ({ email }) => {
  return api.post("/forgot-password", { email }).then((response) => {
    return response.data;
  });
};

const resetPassword = ({ new_password, token }) => {
  return api
    .post("/reset-password?token=" + token, { new_password })
    .then((response) => {
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
  forgotPassword,
  resetPassword,
};
