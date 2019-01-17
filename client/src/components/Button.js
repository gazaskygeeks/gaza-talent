import React from "react";

export default ({ children, onClick, className, disabled, primary }) => {
  const font = primary ? "  dark-blue b" : " gold";
  return disabled ? (
    <button
      className={`bw0 b--black bg-white bw0 tc ttu gray ${className}`}
      type="button"
      disabled={true}
    >
      {children}
    </button>
  ) : (
    <button
      className={`pointer bw0 b--black bg-white bw0 hover-bg-light-gray tc ttu moon-gray ${font} ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
