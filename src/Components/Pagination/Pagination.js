import React from "react";
import { Button } from "@mui/material";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  

  const generatePageNumbers = () => {
    const pageNum = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNum.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant="contained"
          disabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }
    return pageNum;
  };


  return (
    <div className="pagination">
        <Button
        variant="contained"
        onClick={()=> onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </Button>
      <Button
        variant="contained"
        onClick={()=>onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {generatePageNumbers()}
      <Button
        variant="contained"
        onClick={()=>onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
      <Button
        variant="contained"
        onClick={()=>onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </Button>
    </div>
  );
};

export default Pagination;
