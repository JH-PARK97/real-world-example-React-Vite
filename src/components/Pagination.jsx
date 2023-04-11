import React, { useState } from "react";

const Pagination = ({ limit, totalCount, clickPageButton }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number, idx) => (
        <li key={number} className="page-item">
          <button
            className={"page-link"}
            onClick={(e) => {
              clickPageButton(number);
            }}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
