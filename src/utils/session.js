const Session = {
  getToken() {
    return localStorage.getItem("token") ? localStorage.getItem("token") : null;
  },
  setToken(token) {
    return localStorage.setItem("token", token);
  },
};

export default Session;
