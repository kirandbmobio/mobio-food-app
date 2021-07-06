import React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Toast = {
  setToastMessage(message) {
    return toast(message, options);
  },
  successToastMessage(message) {
    return toast.success(message, options);
  },
  infoToastMessage(message) {
    return toast.info(message, options);
  },
  warningToastMessage(message) {
    return toast.warn(message, options);
  },
  errorToastMessage(message) {
    return toast.error(message, options);
  },
  darkToastMessage(message) {
    return toast.dark(message, options);
  },
};

export default Toast;
