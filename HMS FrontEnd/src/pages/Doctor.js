import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import { useState } from "react";
import { CDBBtn } from "cdbreact";
import axios from "axios";
import RemoveDoctor from "../components/RemoveDoctor";
import AddDoctor from "../components/AddDoctor";
import DoctorList from "../components/DoctorList";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useAlert } from "react-alert";

function Doctor() {
  const alert = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const DoctorFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/doctor")
      .then(function (response) {
        // handle success
        setDoctorData(response.data);
      })
      .catch(function (error) {
        // handle error
        alert.error(error);
      })
      .finally(function () {
        // always executed
        console.log("Done");
      });
  };
  const [doctorData, setDoctorData] = useState(DoctorFetch);
  const data = {
    columns: [
      {
        label: "Doctor ID",
        field: "doctor_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Employee ID",
        field: "employee_id",
        sort: "asc",
        width: 270,
      },
      {
        label: "Employee Name",
        field: "employee_name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Qualification",
        field: "qualification",
        sort: "asc",
        width: 100,
      },
      {
        label: "Patient ID",
        field: "patient_id",
        sort: "asc",
        width: 100,
      },
    ],
    rows: doctorData,
  };
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

  const [isOpenList, setIsOpenList] = useState(false);
  const openListModal = () => {
    setIsOpenList(true);
  };
  const closeListModal = () => {
    setIsOpenList(false);
  };

  const UpdateState = () => {
    DoctorFetch();
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
        style={{ width: "auto", paddingLeft: "0px", paddingBottom: "70px" }}
      >
        <Row style={{ paddingTop: "20px" }}>
          <Col>
              <motion.h5
                animate={{ x: 0 }}
                initial={{ x: -500 }}
                transition={{ type: "spring", delay: 0.8 }}
                style={{ color: "black", fontSize: "42px", fontWeight: "400" }}
              >
                Doctor
              </motion.h5>
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
          <Col md={3}>
            <CDBBtn className="btn-custom" outline onClick={openAddModal}>
              ADD New Doctor
            </CDBBtn>
            {isOpenAdd ? (
              <AddDoctor
                closeModal={closeAddModal}
                isOpen={isOpenAdd}
                UpdateState={UpdateState}
              />
            ) : (
              ""
            )}
          </Col>
          <Col md={3}>
            <CDBBtn className="btn-custom" outline onClick={openRemoveModal}>
              Remove Doctor By ID
            </CDBBtn>
            {isOpenRemove ? (
              <RemoveDoctor
                closeModal={closeRemoveModal}
                isOpen={isOpenRemove}
                UpdateState={UpdateState}
              />
            ) : (
              ""
            )}
          </Col>
          <Col md={3}>
            <CDBBtn className="btn-custom" outline onClick={openListModal}>
              Doctor List
            </CDBBtn>
            {isOpenList ? (
              <DoctorList
                closeModal={closeListModal}
                isOpen={isOpenList}
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

export default Doctor;
