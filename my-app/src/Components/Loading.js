import React from "react";

function Loading() {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className="mx-auto w-12 h-12 border-4 border-blue-400 border-solid rounded-full animate-spin my-2"
    ></div>
  );
}

export default Loading;
