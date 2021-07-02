import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

import FacebookIcon from "../../../src/Icons/Facebook";
import GoogleIcon from "../../../src/Icons/Google";
import AlertMessage from "../../components/Alert/AlertMessage";

import { register } from "../../actions/auth";

function Register(props) {
  let [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "user",
  });
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = await register(values);
    if (data.payload) {
      if (data.payload.newUser) {
        setMessage(data.payload.message);
        props.history.push("/login");
      } else {
        setMessage(data.payload.user.data.message);
      }
    }
  };
  const handleBlur = () => {};
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div style={{ marginTop: "7%", textAlign: "center" }}>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography color="textPrimary" variant="h2">
                Register
              </Typography>
            </Box>
            {message && (
              <AlertMessage
                severity={"error"}
                title={"Error"}
                message={message}
              />
            )}
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="fname"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.fname}
              //   variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="lname"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.lname}
              //   variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              //   variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              //   variant="outlined"
            />
            <Box sx={{ py: 2 }} m={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Already have an account?
              <Link component={RouterLink} to="/Login" variant="h6">
                Login
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </div>
  );
}

export default withRouter(
  connect(
    (state) => ({ auth: state.auth.user }),
    (dispatch) =>
      bindActionCreators(
        {
          register,
        },
        dispatch
      )
  )(Register)
);
