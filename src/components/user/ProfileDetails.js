import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";

const ProfileDetails = (props) => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (props.profileData && props.profileData.fname) {
      setValues(props.profileData);
    }
  }, [props]);

  const submit = () => {
    props.submit(values);
  };
  const changePassword = () => {
    props.changePassword({ _id: values._id, password: password });
    setPassword("");
  };
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="fname"
                onChange={handleChange}
                required
                value={values.fname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lname"
                onChange={handleChange}
                required
                value={values.lname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                value={password}
                variant="outlined"
              />
              <Button
                style={{
                  margin: "10px",
                }}
                color="primary"
                disabled={password ? false : true}
                variant="contained"
                onClick={changePassword}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <Button
            color="primary"
            disabled={values.email && !password ? false : true}
            variant="contained"
            onClick={submit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileDetails;
