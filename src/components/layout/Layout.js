import React from "react";

export default function Layout(props) {
  return (
    <div>
      <h1>Layout</h1>
      <p>{props.children}</p>
    </div>
  );
}
