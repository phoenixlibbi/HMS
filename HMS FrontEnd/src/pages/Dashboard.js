import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserDoctor,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const styleSheet = {
    header: { backgroundColor: "#e2252b", color: "white", fontSize: "20px" },
    body: { backgroundColor: "#333333", color: "white" },
    text: { color: "white", fontSize: "18px" },
  };

  const getEmpCount = async () => {
    await axios
      .get(`http://localhost:8080/employee/count/all`)
      .then(function (response) {
        setEmpCount(response.data[0].COUNT);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNurseCount = async () => {
    await axios
      .get(`http://localhost:8080/nurse/count/all`)
      .then(function (response) {
        setNurCount(response.data[0].COUNT);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDocCount = async () => {
    await axios
      .get(`http://localhost:8080/doctor/count/all`)
      .then(function (response) {
        setDocCount(response.data[0].COUNT);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [docCount, setDocCount] = useState();
  const [nurCount, setNurCount] = useState();
  const [empCount, setEmpCount] = useState();
  useEffect(() => {
    getDocCount();
    getNurseCount();
    getEmpCount();
  });

  return isLoading ? (
    <Loader />
  ) : (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      transition={{ type: "spring" }}
    >
      <Container style={{paddingTop:"0px"}}>
        <Row style={{ paddingTop: "20px" }}>
          <Col>
            <motion.h5
            animate={{ x: 0 }}
              initial={{ x: -500 }}
              transition={{ type: "spring",delay: 0.8 }}
            style={{ color: "black", fontSize: "42px", fontWeight: "400" }}
          >
            Dashboard
          </motion.h5>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px" }}>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Card style={{ width: "20rem" }} className="mb-2">
                <Card.Header style={styleSheet.header}>
                  <FontAwesomeIcon icon={faUser} size="lg" /> Total Number of
                  Employee
                </Card.Header>
                <Card.Body style={styleSheet.body}>
                  <Card.Text style={styleSheet.text}>{empCount}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Card style={{ width: "20rem" }} className="mb-2">
                <Card.Header style={styleSheet.header}>
                  <FontAwesomeIcon icon={faUserDoctor} size="lg" /> Total Number
                  of Doctor
                </Card.Header>
                <Card.Body style={styleSheet.body}>
                  <Card.Text style={styleSheet.text}>{docCount}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Card style={{ width: "20rem" }} className="mb-2">
                <Card.Header style={styleSheet.header}>
                  <FontAwesomeIcon icon={faUserNurse} size="lg" /> Total Number
                  of Nurse
                </Card.Header>
                <Card.Body style={styleSheet.body}>
                  <Card.Text style={styleSheet.text}>{nurCount}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Dashboard;
