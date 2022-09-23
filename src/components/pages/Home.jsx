import {
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link ,useParams} from "react-router-dom";
import axios from "axios";
import  {useState,useEffect} from "react";
const Home = () => {
  const { id } = useParams();
  const [student,setStudent] = useState({
    stuname:"",
    email:""
  });
  function onTextFieldChange(e){
    setStudent({
      ...student,
      [e.target.name]:e.target.value
      
    })
  }
  const [status,setStatus] = useState();
  async  function onFormSubmit(e){
   e.preventDefault()
   try {
   await axios.post(`http://localhost:3000/students`,student)
    setStatus(true);
    
  } catch (error) {
    console.log("something is wrong");
  }
  }
  const [students,setStudents] =  useState([]);
  useEffect(()=>{
    async function getAllStudent(){
      try{
        const students = await axios.get('http://localhost:3000/students')
        // console.log(students.data);
        setStudents(students.data);
      } catch (error){
        console.log("something is wrong");
      }
    }
    getAllStudent();
  },[])
  if(status){
    return <Home/>
  }
  const handleDelete = async id => {
    await axios.delete(`http://localhost:3000/students/${id}`,student)
    var newstudent = students.filter((item)=>{
      console.log(item.id)
      return item.id !== id;
    })
    setStudents(newstudent);
  }

  return (
    <>
      <Box
        textAlign="center"
        p={2}
        mb={2}
        sx={{ backgroundColor: "Purple", color: "white" }}
      >
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>
      <Grid container justify="center"spacing={4}>
        <Grid item md={6} xs={12}>
          <Box
            textAlign="center"
            p={2}
            mb={2}
            sx={{ backgroundColor: "green", color: "white" }}
          >
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  autoFocus
                  onChange={(e) =>  onTextFieldChange(e)}
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
                  onChange={(e)=>  onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              onClick={(e) => onFormSubmit(e)}>
                Add
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            textAlign="center"
            p={2}
            sx={{ backgroundColor: "orange", color: "white" }}
          >
            <Typography variant="h4">Student List</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#616161" }}>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    No
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
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  students.map((student,i) =>{
                    return (
                      <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{student.stuname}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <Link to={`/view/${student.id}`}>
                          <VisibilityIcon color="Primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Link to={`/edit/${student.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={()=>  handleDelete(student.id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                    )
                  })
                }
                
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
