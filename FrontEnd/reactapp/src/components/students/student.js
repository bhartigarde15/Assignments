import React, { Component } from "react";
import "../../assets/styles/student.css";
import { Table, Container, Button, Form } from "react-bootstrap";

class Students extends Component {
  state = {};
  constructor() {
    super();
    this.rollno = React.createRef();
    this.name = React.createRef();
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(students =>
        this.setState({ students }, () => console.log("Students:", students))
      );
  }

  deleteRecord(index) {
    let newState = this.state;

    let rollno = this.state.students[index].rollno;
    let name = this.state.students[index].name;

    newState.students.splice(index, 1);
    this.setState(newState);

    fetch("http://localhost:5000/deleteStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rollno, name })
    });
  }

  addRecord(rollno, name) {
    let newState = this.state;

    newState.students.push({ rollno: rollno, name: name });
    this.setState(newState);

    fetch("http://localhost:5000/addStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rollno, name })
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center min-vh-100">
          <Container>
            <h1>Students List</h1>

            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Delete Student</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map((student, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{student.rollno}</td>
                    <td>{student.name}</td>
                    <td>
                      <Button
                        key={index + "BUTTON"}
                        onClick={() => this.deleteRecord(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td></td>
                  <td>
                    <Form.Control
                      type="text"
                      id="rollno"
                      ref={this.rollno}
                      placeholder="Enter Roll No"
                    ></Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      id="name"
                      ref={this.name}
                      placeholder="Enter Name"
                    ></Form.Control>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        this.addRecord(
                          this.rollno.current.value,
                          this.name.current.value
                        )
                      }
                    >
                      Add Student
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
