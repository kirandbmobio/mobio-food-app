import api from "../utils/axios";

const register = ({ fname, lname, email, password, role }) => {
  return api.post("/auth/register", {
    fname,
    lname,
    email,
    password,
    role,
  });
};

const login = ({ email, password }) => {
  return api
    .post("/auth/login", {
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
  return api.post("/auth/forgot-password", { email }).then((response) => {
    return response.data;
  });
};

const resetPassword = ({ new_password, token }) => {
  return api
    .post("/auth/reset-password?token=" + token, { new_password })
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
