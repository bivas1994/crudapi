import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const View = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3000/students/${id}`);
        console.log(student.data);
        setStudent(student.data);
      } catch (error) {
        console.log("something is wrong");
      }
    }
    getStudent();
  },[id]);
  
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Box
        textAlign="center"
        p={2}
        sx={{ backgroundColor: "orange", color: "white" }}
      >
        <Typography variant="h4">student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.stuname}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back to Home
        </Button>
      </Box>
    </>
  );
};
export default View;
