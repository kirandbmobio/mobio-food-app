import axios from "axios";

// let instance = axios.create({
//   baseURL: `http://localhost:8000/api`,
//   headers: {
//     "Content-type": "application/json",
//     Authorization: localStorage.getItem("token")
//       ? localStorage.getItem("token")
//       : null,
//   },
// });

// const responseHandler = (response) => {
//   console.log("response", response);
//   if (response.status === 401) {
//     window.location = "/login";
//   }

//   return response;
// };

// const errorHandler = (error) => {
//   return Promise.reject(error);
// };

// instance.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => errorHandler(error)
// );

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
  baseURL: `http://localhost:8000/api`,
  timeout: 10000,
  headers: { "Content-type": "application/json" },
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  request.headers.Authorization = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  return request;
};

const responseHandler = (response) => {
  console.log("response", response);
  if (response.status === 401) {
    window.location = "/login";
  }

  return response;
};

const errorHandler = (error) => {
  //   console.log("error", error);
  if (error.response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  }
  return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
