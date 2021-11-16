import React from "react";

function ErrorMessage({ error }) {
  return <div className="text-red-500 text-md text-center">{error}</div>;
}

export default ErrorMessage;
