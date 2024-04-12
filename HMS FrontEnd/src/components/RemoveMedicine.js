import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {CDBBtn} from "cdbreact";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const RemoveMedicine = (props) => {
  const alert=useAlert();
  const [id, setID] = useState(null);
  const [pid, setPID] = useState(null);

  const idChange = (e) => {
    setID(e.target.value);
  };
  const pidChange = (e) => {
    setPID(e.target.value);
  };
  const handleSubmit = async (
    Sid,Spid
  ) => {
    if (Sid !== null && Spid !== null) {
      if(/[0-9]/.test(Sid) && /[0-9]/.test(Spid))
      {
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.delete(
          `http://localhost:8080/medicine/${Sid}`,{ data: { patient_id: parseInt(Spid, 10) }},
          customConfig
        );
        props.closeModal();
        alert.success("Medicine Record Removed Successfully");
        setID("");
        setPID("");
        props.UpdateState();
      }
      else{
        alert.error("Please Enter the correct Medicine ID or Patient ID");
      }
    }
    else{
      alert.error("Please Enter Medicine ID or Patient ID");
    }
  };

  return (
    <>
      <Modal size="sm" show={props.isOpen} onHide={props.closeModal} style={{paddingTop:"200px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Medicine Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group>
              <Form.Label>Medicine ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={idChange}
                value={id}
                placeholder="Enter Medicine ID"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Patient ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={pidChange}
                value={pid}
                placeholder="Enter Patient ID"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="btn-custom" outline
            type="submit"
            onClick={() => handleSubmit(id,pid)}
          >
            Submit
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveMedicine;
