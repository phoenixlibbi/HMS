import { Row, Col, Container } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import { MDBDataTable } from "mdbreact";
import { useState } from "react";
import axios from "axios";
import AddPatient from "../components/AddPatient";
import RemovePatient from "../components/RemovePatient";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

function Patient() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const PatientFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/patient")
      .then(function (response) {
        // handle success
        setPatData(response.data);
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
  const [patData, setPatData] = useState(PatientFetch);
  const data = {
    columns: [
      {
        label: "Patient ID",
        field: "patient_id",
        sort: "asc",
        width: 150
      },
      {
        label: "Employee Name",
        field: "patient_name",
        sort: "asc",
        width: 270
      },
      {
        label: "Phone No",
        field: "phone_no",
        sort: "asc",
        width: 200
      },
      {
        label: "Blood Group",
        field: "blood_group",
        sort: "asc",
        width: 100
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150
      },
      {
        label: "Gender",
        field: "gender",
        sort: "asc",
        width: 100
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 100
      },
      {
        label: "Disease",
        field: "disease",
        sort: "asc",
        width: 100
      },
      {
        label: "Arrival Date",
        field: "arrival_date",
        sort: "asc",
        width: 100
      },
      {
        label: "Discharge Date",
        field: "discharge_date",
        sort: "asc",
        width: 100
      }
    ],
    rows: patData
  }
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const openAddModal = () => {
    setIsOpenAdd(true);
  };
  const closeAddModal = () => {
    setIsOpenAdd(false);
  };
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const openRemoveModal = () => {
    setIsOpenRemove(true);
  };
  const closeRemoveModal = () => {
    setIsOpenRemove(false);
  };

  const UpdateState = () => {
    PatientFetch();
  };

  return isLoading ? (
    <Loader/>
  ) : (
    <motion.div animate={{ y: 0 }} initial={{ y: -100 }}
    transition={{ type: "spring"}}>
    <Container style={{width:"auto",paddingLeft:"0px",paddingTop:"0px",paddingBottom:"70px"}}>
    <Row style={{ paddingTop: "20px" }}>
          <Col>
            <motion.h5
            animate={{ x: 0 }}
              initial={{ x: -500 }}
              transition={{ type: "spring",delay: 0.8 }}
            style={{ color: "black", fontSize: "42px", fontWeight: "400" }}
          >
            Patient
          </motion.h5>
          </Col>
        </Row>
      <Row style={{ paddingTop: "40px" }}>
        <Col>        
        <MDBDataTable striped bordered hover data={data} data-mdb-fixed-header={true}/>
        </Col>
      </Row>
      <Row>
        <Col md={3} >
          <CDBBtn className="btn-custom"  outline onClick={openAddModal}>ADD New Patient</CDBBtn>
          {isOpenAdd ? (
            <AddPatient
              closeModal={closeAddModal}
              isOpen={isOpenAdd}
              UpdateState={UpdateState}
            />
          ) : (
            ""
          )}
        </Col>
        <Col md={3}>
          <CDBBtn className="btn-custom"  outline onClick={openRemoveModal}>Remove Patient By ID</CDBBtn>
          {isOpenRemove ? (
            <RemovePatient
              closeModal={closeRemoveModal}
              isOpen={isOpenRemove}
              UpdateState={UpdateState}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
    </motion.div>
  );
}

export default Patient;
