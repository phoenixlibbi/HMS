import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const AddMedicine = (props) => {
  const alert = useAlert();
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(null);
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
  const quantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const dateChange = (e) => {
    setDate(e.target.value);
  };
  const patientIDChange = (e) => {
    setPid(e.target.value);
  };
  const handleSubmit = async (Sid, Sname, Squantity, Scost, Sdate, Spid) => {
    if (
      Sid !== null &&
      Sname !== "" &&
      Scost !== null &&
      Sdate !== "" &&
      Spid !== null &&
      Squantity !== null
    ) {
      if (
        /[0-9]/.test(Sid) &&
        /[0-9]/.test(Scost) &&
        /[0-9]/.test(Spid) &&
        /[0-9]/.test(Squantity)
      ) {
        const data = {
          medicine_id: parseInt(Sid, 10),
          medicine_name: Sname,
          quantity: parseInt(Squantity, 10),
          date: Sdate,
          medicine_cost: Scost,
          patient_id: parseInt(Spid, 10),
        };
        const PostData = JSON.stringify(data);
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.post(
          "http://localhost:8080/medicine",
          PostData,
          customConfig
        );
        props.closeModal();
        setID("");
        setName("");
        setQuantity("");
        setCost("");
        setDate("");
        setPid("");
        alert.success("Medicine Record Added Successfully");
        props.UpdateState();
      } else {
        alert.error(
          "Please Enter the correct Medicine ID,Patient ID,Quantity and Medicine Cost"
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
          <Modal.Title>ADD Medicine Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Medicine ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={idChange}
                value={id}
                placeholder="Enter Medicine ID"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Medicine Name: </Form.Label>
              <Form.Control
                type="text"
                onChange={nameChange}
                value={name}
                placeholder="Enter Medicine Name"
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
              <Form.Label>Medicine Quantity: </Form.Label>
              <Form.Control
                type="number"
                onChange={quantityChange}
                value={quantity}
                placeholder="Enter Medicine Quantity"
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="6">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" onChange={dateChange} value={date} />
            </Form.Group>
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
            onClick={() => handleSubmit(id, name, quantity, cost, date, pid)}
          >
            Submit
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMedicine;
