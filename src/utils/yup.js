import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string("Email must be string")
    .email("Invalid email")
    .required("Email is required"),
});

export const loginSchema = yup.object().shape({
  password: yup
    .string("Password must be string")
    .required("Password is required"),
  email: yup
    .string("Email must be string")
    .email("Invalid email")
    .required("Email is required"),
});
export const signupSchema = yup.object().shape({
  password: yup
    .string("Password must be string")
    .required("Password is required"),
  email: yup
    .string("Email must be string")
    .email("Invalid email")
    .required("Email is required"),
  lname: yup
    .string("Last Name must be string")
    .required("Last Name is required"),
  fname: yup
    .string("First Name must be string")
    .required("First Name is required"),
});

export const resetPasswordSchema = yup.object().shape({
  new_password: yup
    .string("New password must be string")
    .required("New Password is required"),
});
