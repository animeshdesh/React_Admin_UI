import React from "react";
import { Typography, TextField } from "@mui/material";

const Search = ({handelSearch,searchTerm})=>{
    return(
        <>
        <TextField
        value={searchTerm}
        onChange={handelSearch}  
        label="Search by Name, Email or Role" 
        variant="outlined"
        fullWidth />
        </>
    )
}

export default Search;