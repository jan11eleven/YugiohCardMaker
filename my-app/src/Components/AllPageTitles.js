import React from "react";

function AllPageTitles({ title }) {
  return (
    <div>
      <h1 className="text-center font-bold py-5 text-2xl text-purple-500 sm:text-3xl text-2xl">
        {title}
      </h1>
    </div>
  );
}

export default AllPageTitles;
