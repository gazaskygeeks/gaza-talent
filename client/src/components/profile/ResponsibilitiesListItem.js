import React from "react";
import { CLASS_NAME_TEXT_SMALL } from "../../constants/typeographyClassNames";

export default ({ children, ...attrs }) => (
  <li {...attrs} className={`mv1 pv0 ${CLASS_NAME_TEXT_SMALL}`}>
    {children}
  </li>
);
