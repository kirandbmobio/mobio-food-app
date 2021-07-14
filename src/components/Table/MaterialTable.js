import React from "react";

import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";

function CommonMaterialTable(props) {
  return (
    <MaterialTable
      style={{ width: "100%" }}
      title={props.title}
      columns={props.columns}
      data={props.data}
      icons={tableIcons}
      //   options={props.options}
      //   actions={props.actions}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            props.update(newData, oldData, resolve);
          }),
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            props.add(newData, resolve);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            props.delete(oldData, resolve);
          }),
      }}
    />
  );
}

export default CommonMaterialTable;
