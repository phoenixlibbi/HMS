import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {CDBBtn} from "cdbreact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAlert } from "react-alert";

const AddPatient = (props) => {
  const alert=useAlert();
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [disease, setDisease] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
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
  const phoneChange = (e) => {
    setPhone(e.target.value);
  }
  const bloodGroupChange = (e) => {
    setBloodGroup(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)[0]
    );
  }
  const genderChange = (e) => {
    setGender(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)[0]
    );
  }
  const diseaseChange = (e) => {
    setDisease(e.target.value);
  }
  const arrivalDateChange = (e) => {
    setArrivalDate(e.target.value);
  }
  const dischargeDateChange = (e) => {
    setDischargeDate(e.target.value);
  }
  const handleSubmit = async (
    Sid,
    Sname,
    Semail,
    Saddress,
    Sphone,
    SbloodGroup,
    Sgender,
    Sdisease,
    SarrivalDate,
    SdischargeDate
  ) => {
    if (
      Sid !== null &&
      Sname !== "" &&
      Semail !== "" &&
      Saddress !== "" &&
      Sphone !== "" &&
      SbloodGroup !== "None" &&
      Sgender !== "None" &&
      Sdisease !== "" &&
      SarrivalDate !== "" &&
      SdischargeDate !== ""
    ) {
      if(/[0-9]/.test(Sid))
      {
      const data = {
        patient_id: parseInt(Sid, 10),
        patient_name: Sname,
        phone: Sphone,
        blood_group: SbloodGroup,
        email: Semail,
        gender: Sgender,
        address: Saddress,
        disease: Sdisease,
        arrival_date: SarrivalDate,
        discharge_date: SdischargeDate,
      };
      
      const PostData = JSON.stringify(data);
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:8080/patient",
        PostData,
        customConfig
      );
      props.closeModal();
      alert.success("Patient Added Successfully");
      setID("");
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setBloodGroup("");
      setGender("");
      setDisease("");
      setArrivalDate("");
      setDischargeDate("");
      props.UpdateState();
    } else {
      alert.error("Please Enter the correct patient id");
    }
  }
  else {
    alert.error("Please fill all the fields");
  }
  };

  return (
    <>
      <Modal size="lg" show={props.isOpen} onHide={props.closeModal} style={{paddingTop:"120px"}}>
        <Modal.Header closeButton>
          <Modal.Title>ADD Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Patient ID: </Form.Label>
              <Form.Control
                type="text"
                onChange={idChange}
                value={id}
                placeholder="Enter Patient ID"
              />
            </Form.Group>
            <Form.Group as={Col} md="8">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                onChange={nameChange}
                value={name}
                placeholder="Enter Patient Name"
              />
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} md="5">
              <Form.Label blockquote>Gender:</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={genderChange}
              >
                <option value={null}>None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Blood Group:</Form.Label>
              <Form.Control
                as="select"
                value={bloodGroup}
                onChange={bloodGroupChange}
              >
                <option value={null}>None</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Control>
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col}>
              <Form.Label>Disease:</Form.Label>
              <Form.Control
                type="text"
                onChange={diseaseChange}
                value={disease}
                placeholder="Enter the Disease"
              />
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                onChange={emailChange}
                value={email}
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                type="text"
                onChange={phoneChange}
                value={phone}
                placeholder="Enter Phone No"
              />
            </Form.Group>
            </Row>
            <Form.Group>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="address"
                onChange={addressChange}
                value={address}
                placeholder="Enter Address"
              />
            </Form.Group>
            <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Arrival Date:</Form.Label>
              <Form.Control type="date" onChange={arrivalDateChange} value={arrivalDate} />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Discharge Date:</Form.Label>
              <Form.Control
                type="date"
                onChange={dischargeDateChange}
                value={dischargeDate}
              />
            </Form.Group>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="btn-custom" outline
            type="submit"
            onClick={() =>
              handleSubmit(
                id,
                name,
                email,
                address,
                phone,
                bloodGroup,
                gender,
                disease,
                arrivalDate,
                dischargeDate
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

export default AddPatient;
