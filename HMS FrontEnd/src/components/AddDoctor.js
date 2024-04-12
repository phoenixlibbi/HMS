import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {CDBBtn} from "cdbreact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const AddDoctor = (props) => {
  const alert=useAlert();
  const [drid, setDRID] = useState(null);
  const [qualify, setQualify] = useState("");
  const [pid, setPID] = useState(null);
  const [empid, setEmpID] = useState(null);
  const DridChange = (e) => {
    setDRID(e.target.value);
  };
  const QualifyChange = (e) => {
    setQualify(e.target.value);
  };
  const PIDChange = (e) => {
    setPID(e.target.value);
  };
  const EmpIDChange = (e) => {
    setEmpID(e.target.value);
  };
  
  const handleSubmit = async (
    Sdid,Squalify,Spid,Sempid
  ) => {
    if (Sdid !== null && Sempid !== null && Spid !== null && Squalify !== "") 
     {
      if(/[0-9]/.test(Sdid) && /[0-9]/.test(Sempid) && /[0-9]/.test(Spid))
      {
      const data = {
        doctor_id: parseInt(Sdid, 10),
        qualification:Squalify,
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
        "http://localhost:8080/doctor",
        PostData,
        customConfig
      );
      props.closeModal();
      alert.success("Doctor Added Successfully");
      setDRID("");
      setQualify("");
      setPID("");
      setEmpID("");
      props.UpdateState();
    } else {
      alert.error("Please Enter the correct Doctor ID,Patient ID and Employee ID");
    }
  }
  else {
    alert.error("Please fill all the fields");
  }
  };

  return (
    <>
      <Modal size="lg" show={props.isOpen} onHide={props.closeModal} style={{paddingTop:"200px"}}>
        <Modal.Header closeButton>
          <Modal.Title>ADD Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Doctor ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={DridChange}
                value={drid}
                placeholder="Enter Doctor ID"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
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
            <Form.Group as={Col} md="6">
              <Form.Label>Qualification: </Form.Label>
              <Form.Control
                type="text"
                onChange={QualifyChange}
                value={qualify}
                placeholder="Enter Qualification Level"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Patient ID:</Form.Label>
              <Form.Control
                type="text"
                onChange={PIDChange}
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
                drid,
                qualify,
                pid,
                empid
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

export default AddDoctor;
