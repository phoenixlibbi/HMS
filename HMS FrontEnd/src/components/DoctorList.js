import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MDBTable,MDBTableHead,MDBTableBody } from "mdbreact";
import axios from "axios";

const DoctorList = (props) => {

  const DataFetch = async () => {
    // Make a request for a user with a given ID
    await axios
      .get("http://localhost:8080/doctor/all")
      .then(function (response) {
        // handle success
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  };

  const [data, setData] = useState(DataFetch);

  return ( data.length > 0 &&
    <>
      <Modal className="main-content" size="lg" show={props.isOpen} onHide={props.closeModal} style={{paddingTop:"120px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBTable>
      <MDBTableHead dark>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Employee Type</th>
              </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((item) => (
                <tr>
                  <td>{item.employee_id}</td>
                  <td>{item.employee_name}</td>
                  <td>{item.emp_type}</td>
                </tr>
            ))}
      </MDBTableBody>
    </MDBTable>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DoctorList;
