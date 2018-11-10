import React from "react";
import "./Jumbotron.css";


const Jumbotron = ({ children }) => (
  <div
    style={{ height: 100, clear: "both", paddingTop: 30, textAlign: "center"}}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
