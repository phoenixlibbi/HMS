import { Row, Col, Container } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import { MDBDataTable } from "mdbreact";
import { useState } from "react";
import axios from "axios";
import RemoveNurse from "../components/RemoveNurse";
import AddNurse from "../components/AddNurse";
import NurseList from "../components/NurseList";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

function Nurse() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const NurseFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/nurse")
      .then(function (response) {
        // handle success
        setNurseData(response.data);
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
  const [nurseData, setNurseData] = useState(NurseFetch);
  const data = {
    columns: [
      {
        label: "Nurse ID",
        field: "nurse_id",
        sort: "asc",
        width: 150
      },
      {
        label: "Employee ID",
        field: "employee_id",
        sort: "asc",
        width: 270
      },
      {
        label: "Nurse Name",
        field: "employee_name",
        sort: "asc",
        width: 200
      },
      {
        label: "Patient ID",
        field: "patient_id",
        sort: "asc",
        width: 100
      }
    ],
    rows: nurseData
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
  const [isOpenList, setIsOpenList] = useState(false);
  const openListModal = () => {
    setIsOpenList(true);
  };
  const closeListModal = () => {
    setIsOpenList(false);
  };
  const UpdateState = () => {
    NurseFetch();
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
            Nurse
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
          <CDBBtn className="btn-custom"  outline onClick={openAddModal}>ADD New Nurse</CDBBtn>
          {isOpenAdd ? (
            <AddNurse
              closeModal={closeAddModal}
              isOpen={isOpenAdd}
              UpdateState={UpdateState}
            />
          ) : (
            ""
          )}
        </Col>
        <Col md={3}>
          <CDBBtn className="btn-custom"  outline onClick={openRemoveModal}>Remove Nurse By ID</CDBBtn>
          {isOpenRemove ? (
            <RemoveNurse
              closeModal={closeRemoveModal}
              isOpen={isOpenRemove}
              UpdateState={UpdateState}
            />
          ) : (
            ""
          )}
        </Col>
        <Col md={3}>
          <CDBBtn className="btn-custom"  outline onClick={openListModal}>Nurse List</CDBBtn>
          {isOpenList ? (
            <NurseList
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

export default Nurse;
