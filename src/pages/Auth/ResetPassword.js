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

import { resetPassword } from "../../actions/auth";
import Toast from "../../utils/toast";
import { resetPasswordSchema } from "../../utils/yup";

function Login(props) {
  //   let history = useHistory();
  let [values, setValues] = useState({
    new_password: "",
    confirm_password: "",
  });
  let [token, setToken] = useState("");
  let [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await resetPasswordSchema.validate(values).catch((err) => {
      err.errors.forEach((nerr) => {
        Toast.errorToastMessage(nerr);
      });
    });
    let valid = await resetPasswordSchema.isValid(values);
    if (valid) {
      if (props.match.params.id) {
        setToken(props.match.params.id.toString());
      } else {
        return Toast.errorToastMessage("Please pass token");
      }
      if (!values.new_password && !values.confirm_password) {
        return Toast.errorToastMessage("Please enter both of them");
      } else {
        if (values.new_password != values.confirm_password) {
          return Toast.errorToastMessage(
            "Password and confirm password Mismatch!"
          );
        }
      }
      let data = await resetPassword({
        ...values,
        token: props.match.params.id,
      });
      if (data.payload.data) {
        if (data.payload.data.status == "Error") {
          return Toast.errorToastMessage(data.payload.data.message);
        } else if (data.payload.data.status == "Success") {
          Toast.successToastMessage(data.payload.data.message);
          props.history.push("/login");
        }
      } else {
        return Toast.errorToastMessage(data.payload.response.data.message);
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
            {/* {message && (
              <AlertMessage
                severity={"error"}
                title={"Error"}
                message={message}
              />
            )} */}
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
          resetPassword,
        },
        dispatch
      )
  )(Login)
);
