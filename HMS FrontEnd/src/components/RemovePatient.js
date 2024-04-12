import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {CDBBtn} from "cdbreact";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const RemovePatient = (props) => {
  const alert=useAlert();
  const [id, setID] = useState(null);

  const idChange = (e) => {
    setID(e.target.value);
  };
  const handleSubmit = async (
    Sid
  ) => {
    if (Sid !== null) {
      if(/[0-9]/.test(Sid))
      {
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.delete(
          `http://localhost:8080/patient/${Sid}`,
          customConfig
        );
        props.closeModal();
        alert.success("Patient Removed Successfully");
        setID("");
        props.UpdateState();
      }
      else{
        alert.error("Please Enter the correct patient id");
      }
    }
    else{
      alert.error("Please enter patient id");
    }
  };

  return (
    <>
      <Modal size="sm" show={props.isOpen} onHide={props.closeModal} style={{paddingTop:"200px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group>
              <Form.Label>Patient ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={idChange}
                value={id}
                placeholder="Enter Patient ID"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="btn-custom" outline
            type="submit"
            onClick={() => handleSubmit(id)}
          >
            Submit
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemovePatient;
