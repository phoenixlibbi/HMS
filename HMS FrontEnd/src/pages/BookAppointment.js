import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useAlert } from "react-alert";
import React from "react";
import Table from "react-bootstrap/Table";
import {CDBBtn} from "cdbreact";
import Booking from "../components/Booking";

function BookAppointment() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  // const DoctorFetch = async () => {
  //   // Make a request for a user with a given ID
  //   await axios
  //     .get("http://localhost:8080/doctor")
  //     .then(function (response) {
  //       // handle success
  //       setDoctorData(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.warn(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //       console.log("Done");
  //     });
  // };
  // const [doctorData, setDoctorData] = useState(DoctorFetch);
  const doctorData = [
    {
      doctor_id: "1",
      employee_id: "13245",
      employee_name: "Mohamed",
      specialist: "Dentist",
    },
    {
      doctor_id: "2",
      employee_id: "2234",
      employee_name: "Ali",
      specialist: "Cardiologist",
    },
    {
      doctor_id: "3",
      employee_id: "32345",
      employee_name: "Umar",
      specialist: "Eye Specialist",
    },
  ];

  const openAddModal = () => {
    setIsOpenAdd(true);
  };
  const closeAddModal = () => {
    setIsOpenAdd(false);
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
              Book Appointments
            </motion.h5>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px" }}>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Employee ID</th>
                  <th>Doctor Name</th>
                  <th>Specialist</th>
                </tr>
              </thead>
              <tbody>
                {doctorData.map((doctor) => (
                  <tr>
                  <td>{doctor.doctor_id}</td>
                  <td>{doctor.employee_id}</td>
                  <td>{doctor.employee_name}</td>
                  <td>{doctor.specialist}</td>
                  <td width={"170px"}><CDBBtn onClick={openAddModal} size="medium">Book Appointment</CDBBtn></td>
                </tr>
                ))}
              </tbody>
              {isOpenAdd ? (
              <Booking
                closeModal={closeAddModal}
                isOpen={isOpenAdd}
              />
            ) : (
              ""
            )}
            </Table>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default BookAppointment;
