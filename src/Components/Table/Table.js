import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl,Select, MenuItem, Container, Box, Grid, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TextField } from "@mui/material";
import Search from "../Header/Header";
import Pagination from "../Pagination/Pagination"
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "../Table/Table.css"


const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const USERS_PER_PAGE = 10;


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingRoleUserId, setEditingRoleUserId] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(URL);
    const data = await response.data;
    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleManageAccount = (userId) => {
    setEditingRoleUserId(userId);
  };


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())  ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (user) => {
    const filteredDeleteUser = users.filter((u)=> u.id !== user.id);
    setUsers(filteredDeleteUser);
    setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
  };

  const handleCheckboxChange = (event, user) => {
    const checked = event.target.checked;
    if(checked) {
      setSelectedUsers([...selectedUsers, user]);
    }else {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    }
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => {
      let isSelected = false;
      for (const selectedUser of selectedUsers) {
        if (selectedUser.id === user.id) {
          isSelected = true;
          break;
        }
      }
      console.log(!isSelected);
      return !isSelected;
    });
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleRoleChange = (event, userId) => {
    const newRole = event.target.value;
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
    setEditingRoleUserId(null);
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedUsers([...paginatedUsers]);
    } else {
      setSelectedUsers([]);
    }
  };
  
  
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);


  return (
    <>
    <Container className="tableContainer">
      <Search className="searchInput" searchTerm={searchTerm} handelSearch={handleSearch}/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow 
            key={user.id}
            className={selectedUsers.includes(user)
              ? "tableRowSelected"
              : ""
            }>
              <TableCell>
              <Checkbox
                  checked={selectedUsers.includes(user)}
                  onChange={(event) => handleCheckboxChange(event, user)}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
              {editingRoleUserId === user.id ? (
                    <FormControl>
                      <Select
                          value={user.role}
                          onChange={(event) => handleRoleChange(event, user.id)}
                          className="roleSelected"
                    
                      >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="member">Member</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    user.role
                  )}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleManageAccount(user.id)}><ManageAccountsIcon/></Button>
                <Button onClick={() => handleDeleteUser(user)}><DeleteIcon color="error"/></Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button  className="delete-button" variant="contained" color="error" onClick={handleDeleteSelected} disabled={selectedUsers.length === 0} >
        Delete Selected
      </Button>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      </Container>
    </>
  );
};

export default UserTable;
