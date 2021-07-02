import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function AlertMessage(props) {
  return (
    <Alert severity={props.severity}>
      <AlertTitle>{props.title}</AlertTitle>
      {props.message}
    </Alert>
  );
}
