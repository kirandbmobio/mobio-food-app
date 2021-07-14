import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Layout.css";

export default function HomeLayout(props) {
  return (
    <Sidebar title={"Mobio Food App"}>
      <div className="mtb">{props.children}</div>
    </Sidebar>
  );
}
