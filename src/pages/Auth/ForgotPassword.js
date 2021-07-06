import React, { useState, useHistory } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as yup from "yup";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

import { login, forgotPassword } from "../../actions/auth";
import Toast from "../../utils/toast";
import { forgotPasswordSchema } from "../../utils/yup";

function ForgotPassword(props) {
  //   let history = useHistory();
  let [values, setValues] = useState({ email: "" });
  let [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await forgotPasswordSchema.validate(values).catch((err) => {
      err.errors.forEach((nerr) => {
        Toast.errorToastMessage(nerr);
      });
    });
    let valid = await forgotPasswordSchema.isValid(values);
    if (valid) {
      let data = await forgotPassword(values);
      if (data.payload) {
        if (data.payload.data) {
          props.history.push("/login");
          Toast.successToastMessage("Link is sent to your email address!");
        } else {
          Toast.errorToastMessage(data.payload.response.data.message);
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
                Forgot Password
                {/* Enter Email which you want to reset password */}
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>

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
            <div style={{ color: "grey", float: "left", margin: "8px" }}>
              Reset password link will be sent to your{" "}
              <span style={{ color: "blue" }}>{values.email}</span> email id
            </div>
            <Box sx={{ py: 2 }} m={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Send Mail
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
          forgotPassword,
        },
        dispatch
      )
  )(ForgotPassword)
);
