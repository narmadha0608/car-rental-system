import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, Card, CardContent, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { motion } from "framer-motion";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/allusers")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/users/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setUsers(users.filter(user => user._id !== deleteId));
        setOpen(false);
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(search.toLowerCase()) &&
    (filterRole ? user.role === filterRole : true)
  );

  const adminCount = users.filter(user => user.role === "admin").length;
  const userCount = users.filter(user => user.role === "user").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">User List</h2>
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={6} md={3}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6">Admins</Typography>
              <Typography variant="h4">{adminCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="flex gap-4 mb-4">
        <TextField 
          label="Search Username" 
          variant="outlined" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-1/3" 
        />
        <Select 
          value={filterRole} 
          onChange={(e) => setFilterRole(e.target.value)} 
          displayEmpty 
          className="w-1/4"
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </div>
      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHead>
          <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#333" }}>Username</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333" }}>Password</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333" }}>Role</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <TableCell style={{ backgroundColor: user.role === "admin" ? "#ffebee" : user.role === "user" ? "#e3f2fd" : "inherit" }}>{user.username}</TableCell>
                <TableCell style={{ backgroundColor: user.role === "admin" ? "#ffebee" : user.role === "user" ? "#e3f2fd" : "inherit" }}>{"••••••••"}</TableCell>
                <TableCell style={{ backgroundColor: user.role === "admin" ? "#ffebee" : user.role === "user" ? "#e3f2fd" : "inherit" }}>{user.role || "N/A"}</TableCell>
                <TableCell style={{ backgroundColor: user.role === "admin" ? "#ffebee" : user.role === "user" ? "#e3f2fd" : "inherit" }}>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleOpen(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">No</Button>
          <Button onClick={handleDelete} color="error" autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default UsersManagement;
