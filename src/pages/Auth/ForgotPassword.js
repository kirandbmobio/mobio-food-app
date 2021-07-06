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

import { login, forgotPassword } from "../../actions/auth";

function ForgotPassword(props) {
  //   let history = useHistory();
  let [values, setValues] = useState({ email: "" });
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    setMessage("");
    event.preventDefault();
    let data = await forgotPassword(values);
    if (data.payload) {
      if (data.payload.data) {
        setMessage("success");
        props.history.push("/login");
      } else {
        setMessage(data.payload.response.data.message);
        console.log("data", data);
      }
    }
    console.log("forgot Password", values, data);
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
            {message && (
              <AlertMessage
                severity={"error"}
                title={"Error"}
                message={message}
              />
            )}

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
              <a href="javascript:void(0)">{values.email}</a> email id
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
