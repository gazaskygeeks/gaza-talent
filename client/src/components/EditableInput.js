import React from "react";

export default ({ value, onClick, onSubmit, editable }) =>
  editable ? (
    <span className="ba bw2 b--black">
      <input type="text" value={value} />
    </span>
  ) : (
    <span>{value}</span>
  );
