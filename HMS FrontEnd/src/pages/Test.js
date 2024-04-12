import { Row, Col, Container } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import { MDBDataTable } from "mdbreact";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import AddTest from "../components/AddTest";
import RemoveTest from "../components/RemoveTest";

function Test() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const testFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/test")
      .then(function (response) {
        // handle success
        setTestData(response.data);
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
  const [testData, setTestData] = useState(testFetch);
  const data = {
    columns: [
      {
        label: "Test ID",
        field: "test_id",
        sort: "asc",
        width: 150
      },
      {
        label: "Test Name",
        field: "test_name",
        sort: "asc",
        width: 270
      },
      {
        label: "Test Cost",
        field: "test_cost",
        sort: "asc",
        width: 200
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 100
      },
      {
        label: "Patient ID",
        field: "patient_id",
        sort: "asc",
        width: 150
      }
    ],
    rows: testData
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
    testFetch();
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
            Test
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
          <CDBBtn className="btn-custom"  outline onClick={openAddModal}>ADD New Test Record</CDBBtn>
          {isOpenAdd ? (
            <AddTest
              closeModal={closeAddModal}
              isOpen={isOpenAdd}
              UpdateState={UpdateState}
            />
          ) : (
            ""
          )}
        </Col>
        <Col md={3}>
          <CDBBtn className="btn-custom"  outline onClick={openRemoveModal}>Remove Test Record By ID</CDBBtn>
          {isOpenRemove ? (
            <RemoveTest
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

export default Test;
