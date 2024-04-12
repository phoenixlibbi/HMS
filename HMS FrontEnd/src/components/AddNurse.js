import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {CDBBtn} from "cdbreact";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const AddNurse = (props) => {
  const alert=useAlert();
  const [nid, setNID] = useState(null);
  const [empid, setEmpID] = useState(null);
  const [pid, setPID] = useState(null);
  const NidChange = (e) => {
    setNID(e.target.value);
  };
  const EmpIDChange = (e) => {
    setEmpID(e.target.value);
  };
  const PidChange = (e) => {
    setPID(e.target.value);
  };
  
  const handleSubmit = async (
    Snid,Sempid,Spid
  ) => {
    if (Snid !== null && Sempid !== null && Spid !== null) 
     {
      if(/[0-9]/.test(Snid) && /[0-9]/.test(Sempid) && /[0-9]/.test(Spid))
      {
      const data = {
        nurse_id: parseInt(Snid, 10),
        patient_id:parseInt(Spid, 10),
        employee_id:parseInt(Sempid, 10),
      };
      const PostData = JSON.stringify(data);
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:8080/nurse",
        PostData,
        customConfig
      );
      props.closeModal();
      alert.success("Nurse Added Successfully");
      setNID("");
      setEmpID("");
      setPID("");
      props.UpdateState();
    } else {
      alert.error("Please Enter the correct Nurse ID,Patient ID and Employee ID");
    }
  }
  else {
    alert.error("Please fill all the fields");
  }
  };

  return (
    <>
      <Modal size="md" show={props.isOpen} onHide={props.closeModal} style={{paddingTop:"200px"}}>
        <Modal.Header closeButton>
          <Modal.Title>ADD Nurse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group>
              <Form.Label>Nurse ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={NidChange}
                value={nid}
                placeholder="Enter Nurse ID"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Employee ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={EmpIDChange}
                value={empid}
                placeholder="Enter Employee ID"
              />
            </Form.Group>
            </Row>
            <Row>
            <Form.Group>
              <Form.Label>Patient ID:</Form.Label>
              <Form.Control
                type="text"
                onChange={PidChange}
                value={pid}
                placeholder="Enter Patient ID"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="btn-custom" outline
            type="submit"
            onClick={() =>
              handleSubmit(
                nid,
                empid,
                pid
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

export default AddNurse;
