import React from "react";

export default ({ children, ...attrs }) => (
  <div className="tl mb4" {...attrs}>
    {children}
  </div>
);
