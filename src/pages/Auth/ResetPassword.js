import React, { useState, useHistory } from "react";
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

import { login } from "../../actions/auth";

function Login(props) {
  //   let history = useHistory();
  let [values, setValues] = useState({
    new_password: "",
    confirm_password: "",
  });
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    setMessage("");
    event.preventDefault();
    let data = await login(values);

    if (data.payload) {
      if (data.payload.user) {
        props.history.push("/home");
      } else {
        if (data.payload.response) {
          setMessage(data.payload.response.data.message);
        }
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
                Reset Password
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            {message && (
              <AlertMessage
                severity={"error"}
                title={"Error"}
                message={message}
              />
            )}
            <TextField
              fullWidth
              label="New Password"
              margin="normal"
              name="new_password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.new_password}
              //   variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              name="confirm_password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.confirm_password}
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
                Submit
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Already have an account?
              <Link component={RouterLink} to="/login" variant="h6">
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
          //   resetPassword,
        },
        dispatch
      )
  )(Login)
);
