import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  },
});
