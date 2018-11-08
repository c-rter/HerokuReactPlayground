import React from "react";
import "./CounterBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const CounterBtn = props => (
  <span className="counter-btn btn" {...props}>
    CHECK IN
  </span>
);

export default CounterBtn;
