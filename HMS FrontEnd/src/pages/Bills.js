import { Row, Col, Container } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import Form from "react-bootstrap/Form";
import { MDBDataTable } from "mdbreact";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useAlert } from "react-alert";
import Invoice from "../components/Invoice";
import React from "react";

function Bills() {
  const alert = useAlert();
  const [patientID, setPatientID] = useState(null);
  const [paymentID, setPaymentID] = useState(null);
  const [rpatientID, setRPatientID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const billFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/bill")
      .then(function (response) {
        // handle success
        setBillData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("Done");
      });
  };
  const [billData, setBillData] = useState(billFetch);
  const data = {
    columns: [
      {
        label: "Payment ID",
        field: "payment_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Patient Name",
        field: "patient_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 270,
      },
      {
        label: "Room Cost",
        field: "room_cost",
        sort: "asc",
        width: 200,
      },
      {
        label: "Test Charges",
        field: "othercharge",
        sort: "asc",
        width: 100,
      },
      {
        label: "Medicine Cost",
        field: "mcost",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total Cost",
        field: "Total",
        sort: "asc",
        width: 150,
      },
      {
        label: "Patient ID",
        field: "patient_id",
        sort: "asc",
        width: 150,
      },
    ],
    rows: billData,
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const addBill = async (addID) => {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get(`http://localhost:8080/bill/add/${addID}`, customConfig);
    alert.success("Bill Added Successfully");
    setPatientID("");
    UpdateState();
  };
  const removeBill = async (removeID) => {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.delete(
      `http://localhost:8080/bill/delete/${removeID}`,
      customConfig
    );
    alert.success("Bill Removed Successfully");
    setRPatientID(null);
    UpdateState();
  };
  const UpdateState = () => {
    billFetch();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      transition={{ type: "spring" }}
    >
      <Container
        style={{
          width: "auto",
          paddingLeft: "0px",
          paddingTop: "0px",
          paddingBottom: "70px",
        }}
      >
        <Row style={{ paddingTop: "20px" }}>
          <Col>
            <motion.h5
              animate={{ x: 0 }}
              initial={{ x: -500 }}
              transition={{ type: "spring", delay: 0.8 }}
              style={{ color: "black", fontSize: "42px", fontWeight: "400" }}
            >
              Bill
            </motion.h5>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px" }}>
          <Col md="2">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setPatientID(e.target.value)}
                value={patientID}
                placeholder="Patient ID"
              />
            </Form.Group>
          </Col>
          <Col md="2">
            <CDBBtn
              style={{ backgroundColor: "#e2252b", padding: 10 }}
              block
              onClick={() => {
                addBill(patientID);
              }}
            >
              Add Bill
            </CDBBtn>
          </Col>
          <Col md="2">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setPaymentID(e.target.value)}
                value={paymentID}
                placeholder="Payment ID"
              />
            </Form.Group>
          </Col>
          <Col md="2">
            <CDBBtn
              style={{ backgroundColor: "#e2252b", padding: 10 }}
              block
              onClick={() => {
                openModal();
              }}
            >
              Generate Bill
            </CDBBtn>
          </Col>
          <Col md="2">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setRPatientID(e.target.value)}
                value={rpatientID}
                placeholder="Payment ID"
              />
            </Form.Group>
          </Col>
          <Col md="2">
            <CDBBtn
              style={{ backgroundColor: "#e2252b", padding: 10 }}
              block
              onClick={() => removeBill(rpatientID)}
            >
              Remove Bill
            </CDBBtn>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px" }}>
          <Col>
            <MDBDataTable
              striped
              bordered
              hover
              data={data}
              data-mdb-fixed-header={true}
            />
          </Col>
        </Row>
        <Row>
          {isOpen ? <Invoice closeModal={closeModal} isOpen={isOpen} PID={paymentID}/> : ""}
        </Row>
      </Container>
    </motion.div>
  );
}

export default Bills;
