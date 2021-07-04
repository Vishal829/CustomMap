import React from "react";
import { render } from "react-dom";
import Map from "./Map";

const style = {
  height: "100%",
  overflow: "hidden",
  width: "100%"
}

function App() {

  return (
    <div style={style}>
      <Map />
    </div>
  );
}

render(<App />, document.getElementById("root"));
