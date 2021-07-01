import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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

export default function Login() {
  let [values, setValues] = useState({});
  let [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {};
  const handleBlur = () => {};
  const handleChange = () => {};
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
