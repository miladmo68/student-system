import { Button, Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

export default function Student() {
  const paperStyle = {
    padding: "30px 20px",
    maxWidth: 600,
    margin: "20px auto",
  };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student Added");
      setName("");
      setAddress("");
      fetchStudents(); // Refresh the list after adding a new student
    });
  };

  const fetchStudents = () => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => setStudents(result));
  };

  useEffect(() => {
    fetchStudents();
  }, [name]);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" component="h2" color="primary" gutterBottom>
            Add Student
          </Typography>
          <TextField
            id="student-name"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="student-address"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} style={{ ...paperStyle, marginTop: "30px" }}>
        <Typography variant="h5" component="h3" color="secondary" gutterBottom>
          Student List
        </Typography>
        {students.length > 0 ? (
          students.map((student) => (
            <Paper
              key={student.id}
              elevation={6}
              style={{
                margin: "10px 0",
                padding: "15px",
                textAlign: "left",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography variant="body1">
                <strong>Id:</strong> {student.id}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {student.name}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {student.address}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No students found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
