import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const AddEmp = (props) => {
  const alert = useAlert();
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [empType, setempType] = useState("");
  const [DoB, setDoB] = useState("");
  const [joinningDate, setJoinningDate] = useState("");
  const [salary, setSalary] = useState(null);
  const idChange = (e) => {
    setID(e.target.value);
  };
  const nameChange = (e) => {
    setName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const addressChange = (e) => {
    setAddress(e.target.value);
  };
  const empTypeChange = (e) => {
    setempType(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)[0]
    );
  };
  const DoBChange = (e) => {
    setDoB(e.target.value);
  };
  const joinningDateChange = (e) => {
    setJoinningDate(e.target.value);
  };
  const salaryChange = (e) => {
    setSalary(e.target.value);
  };
  const handleSubmit = async (
    Sid,
    Sname,
    Semail,
    Saddress,
    SempType,
    SDoB,
    SjoinningDate,
    Ssalary
  ) => {
    if (
      Sid !== null &&
      Sname !== "" &&
      Semail !== "" &&
      Saddress !== "" &&
      SempType !== "None" &&
      SDoB !== "" &&
      SjoinningDate !== "" &&
      Ssalary !== null
    ) {
      if (/[0-9]/.test(Sid) && /[0-9]/.test(Ssalary)) {
        const data = {
          employee_id: parseInt(Sid, 10),
          employee_name: Sname,
          email: Semail,
          address: Saddress,
          emp_type: SempType,
          DoB: SDoB,
          joinning_date: SjoinningDate,
          salary: parseInt(Ssalary, 10),
        };
        const PostData = JSON.stringify(data);
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.post(
          "http://localhost:8080/employee",
          PostData,
          customConfig
        );
        props.closeModal();
        alert.success("Employee Added Successfully");
        setID("");
        setName("");
        setEmail("");
        setAddress("");
        setempType("");
        setDoB("");
        setJoinningDate("");
        setSalary("");
        props.UpdateState();
      } else {
        alert.error("Please Enter the correct employee id and salary");
      }
    } else {
      alert.error("Please fill all the fields");
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.isOpen}
        onHide={props.closeModal}
        style={{ paddingTop: "180px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="5">
              <Form.Label>Employee ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={idChange}
                value={id}
                placeholder="Enter Employee ID"
              />
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Employee Type</Form.Label>
              <Form.Control
                as="select"
                value={empType}
                onChange={empTypeChange}
              >
                <option value={null}>None</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="5">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                onChange={nameChange}
                value={name}
                placeholder="Enter Employee Name"
              />
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                onChange={emailChange}
                value={email}
                placeholder="Enter Employee Email"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="8">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                onChange={addressChange}
                value={address}
                placeholder="Enter Employee Address"
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control type="date" onChange={DoBChange} value={DoB} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Joining Date:</Form.Label>
              <Form.Control
                type="date"
                onChange={joinningDateChange}
                value={joinningDate}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Salary:</Form.Label>
              <Form.Control
                type="number"
                onChange={salaryChange}
                value={salary}
                placeholder="Enter the Salary"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn
            className="btn-custom"
            outline
            type="submit"
            onClick={() =>
              handleSubmit(
                id,
                name,
                email,
                address,
                empType,
                DoB,
                joinningDate,
                salary
              )
            }
          >
            Submit
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEmp;
