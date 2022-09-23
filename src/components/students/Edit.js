import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    stuname: " ",
    email: "",
  });
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
  }, [id]);
  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
      
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/students/${id}`, student);

      navigate.push("/");
    } catch (error) {
      console.log("something is wrong");
    }
  }
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Box
        textAlign="center"
        p={2}
        mb={2}
        sx={{ backgroundColor: "purple", color: "white" }}
      >
        <Typography variant="h2">React CURD with API Call</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box
            textAlign="center"
            p={2}
            mb={2}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            <Typography variant="h4">Edit student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidthid="id"
                  label="id"
                  autoFocus
                  value={id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                   id="stuname"
                  label="Name"
                  autoFocus
                  value={student.stuname}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                   id="email"
                  label="Email Address"
                  autoFocus
                  value={student.email}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Update
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" 
            color="primary" 
            onClick={handleClick}>
              back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Edit;
