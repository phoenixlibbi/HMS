import React,{useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
} from "mdbreact";
import { useState } from "react";
import { CDBBtn } from "cdbreact";

function Invoice(props) {
    const [data,setData]=useState(null);
    const [flag,setFlag]=useState(false);
    const GetInvoice = async () => {
      // Make a request for a user with a given ID
      console.log("hihi");
      await axios
        .get(`http://localhost:8080/bill/view/${props.PID}`)
        .then(function (response) {
          // handle success
          setData(response.data);
          console.log(data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
          console.log("Get Invoice");
          setFlag(true);
        });
    };
  const Print = () => {
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  useEffect(() => {
  GetInvoice();
  }, [props.PID])
  
  return (
        <Modal size="lg" show={props.isOpen} onHide={()=>{props.closeModal();setFlag(false)}} style={{paddingTop:"200px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Print Bill</Modal.Title>
        </Modal.Header>
        {flag &&
        <div id="printablediv">
        <MDBContainer className="py-5">
        <MDBCard>
          <MDBCardBody className="mx-4">
            <MDBContainer>
              <p className="my-5 text-center" style={{ fontSize: "30px" }}>
                Thank You for your visit
              </p>
              <MDBRow>
                <MDBTypography listUnStyled>
                  <li className="text-black"><b>Name:</b>  {data[0].patient_name}</li>
                  <li className="text-muted mt-1">
                    <span className="text-black"><b>Payment ID:</b>  {data[0].payment_id}</span>
                  </li>
                  <li className="text-black mt-1"><b>Date:</b>  {data[0].date}</li>
                </MDBTypography>
                <hr />
                <MDBCol xl="10">
                  <p>Room Cost</p>
                </MDBCol>
                <MDBCol xl="2">
                  <p className="float-end">Rs {data[0].room_cost}</p>
                </MDBCol>
                <hr />
              </MDBRow>
              <MDBRow>
                <MDBCol xl="10">
                  <p>Medicine Cost</p>
                </MDBCol>
                <MDBCol xl="2">
                  <p className="float-end">Rs {data[0].mcost}</p>
                </MDBCol>
                <hr />
              </MDBRow>
              <MDBRow>
                <MDBCol xl="10">
                  <p>Other Charges</p>
                </MDBCol>
                <MDBCol xl="2">
                  <p className="float-end">Rs {data[0].othercharge}</p>
                </MDBCol>
                <hr style={{ border: "2px solid black" }} />
              </MDBRow>
              <MDBRow className="text-black">
                <MDBCol xl="12">
                  <p className="float-end fw-bold">Total: Rs {data[0].Total}</p>
                </MDBCol>
                <hr style={{ border: "2px solid black" }} />
              </MDBRow>
              <div className="text-center" style={{ marginTop: "90px" }}>
                <p>Hospital Management System</p>
              </div>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      </div>
      }
      <Modal.Footer>
        <CDBBtn onClick={Print}>Print</CDBBtn>
      </Modal.Footer>
      </Modal>
  );
}

export default Invoice;
