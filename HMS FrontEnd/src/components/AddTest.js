import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const AddTest = (props) => {
  const alert = useAlert();
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(null);
  const [date, setDate] = useState("");
  const [pid, setPid] = useState(null);
  const idChange = (e) => {
    setID(e.target.value);
  };
  const nameChange = (e) => {
    setName(e.target.value);
  };
  const costChange = (e) => {
    setCost(e.target.value);
  };
  const dateChange = (e) => {
    setDate(e.target.value);
  };
  const patientIDChange = (e) => {
    setPid(e.target.value);
  };
  const handleSubmit = async (Sid, Sname, Scost, Sdate, Spid) => {
    if (Sid !== null && Sname !== "" && Scost !== null && Sdate !== "" && Spid !== null) {
      if (/[0-9]/.test(Sid) && /[0-9]/.test(Scost) && /[0-9]/.test(Spid)) {
        const data = {
          test_id: parseInt(Sid, 10),
          test_name: Sname,
          test_cost: parseInt(Scost, 10),
          date: Sdate,
          patient_id: parseInt(Spid, 10),
        };
        const PostData = JSON.stringify(data);
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.post("http://localhost:8080/test", PostData, customConfig);
        props.closeModal();
        setID("");
        setName("");
        setCost("");
        setDate("");
        setPid("");
        alert.success("Test Record Added Successfully");
        props.UpdateState();
      }
      else {
        alert.error(
          "Please Enter the correct Test ID,Patient ID and Test Cost"
        );
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
          <Modal.Title>ADD Test Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Test ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={idChange}
                value={id}
                placeholder="Enter Test ID"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Test Name: </Form.Label>
              <Form.Control
                type="text"
                onChange={nameChange}
                value={name}
                placeholder="Enter Test Name"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Patient ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={patientIDChange}
                value={pid}
                placeholder="Enter Patient ID"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" onChange={dateChange} value={date} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="text"
                onChange={costChange}
                value={cost}
                placeholder="Enter the Cost"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn
            className="btn-custom"
            outline
            type="submit"
            onClick={() => handleSubmit(id, name, cost, date, pid)}
          >
            Submit
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTest;
