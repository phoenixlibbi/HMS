import { Row, Col, Container } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import { MDBDataTable } from "mdbreact";
import { useState } from "react";
import axios from "axios";
import AddEmp from "../components/AddEmp";
import RemoveEmp from "../components/RemoveEmp";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

function Employee() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const EmpFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/employee")
      .then(function (response) {
        // handle success
        setEmpData(response.data);
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
  const [empData, setEmpData] = useState(EmpFetch);
  const data = {
    columns: [
      {
        label: "Employee ID",
        field: "employee_id",
        sort: "asc",
        width: 150
      },
      {
        label: "Employee Name",
        field: "employee_name",
        sort: "asc",
        width: 270
      },
      {
        label: "DOB",
        field: "DoB",
        sort: "asc",
        width: 200
      },
      {
        label: "Joining Date",
        field: "joinning_date",
        sort: "asc",
        width: 100
      },
      {
        label: "Employee Type",
        field: "emp_type",
        sort: "asc",
        width: 150
      },
      {
        label: "Email",
        field: "email",
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
        label: "Salary",
        field: "salary",
        sort: "asc",
        width: 100
      }
    ],
    rows: empData
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
    EmpFetch();
  };

  return isLoading ? (
    <Loader/>
  ) : (
    <motion.div animate={{ y: 0 }} initial={{ y: -100 }}
    transition={{ type: "spring"}}>
    <Container style={{width:"auto",paddingLeft:"0px",paddingTop:"0px",paddingBottom:"70px"}}>
    <Row style={{ paddingTop: "20px" }}>
          <Col><motion.h5
            animate={{ x: 0 }}
              initial={{ x: -500 }}
              transition={{ type: "spring",delay: 0.8 }}
            style={{ color: "black", fontSize: "42px", fontWeight: "400" }}
          >
            Employee
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
          <CDBBtn className="btn-custom"  outline onClick={openAddModal}>ADD New Employee</CDBBtn>
          {isOpenAdd ? (
            <AddEmp
              closeModal={closeAddModal}
              isOpen={isOpenAdd}
              UpdateState={UpdateState}
            />
          ) : (
            ""
          )}
        </Col>
        <Col md={3}>
          <CDBBtn className="btn-custom"  outline onClick={openRemoveModal}>Remove Employee By ID</CDBBtn>
          {isOpenRemove ? (
            <RemoveEmp
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

export default Employee;
