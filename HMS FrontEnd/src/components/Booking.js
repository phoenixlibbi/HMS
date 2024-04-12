import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CDBBtn } from "cdbreact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Calendar from "./Calendar";

const Booking = (props) => {

  return (
    <>
      <Modal
        size="lg"
        show={props.isOpen}
        onHide={props.closeModal}
        style={{ paddingTop: "120px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar/>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="btn-custom" outline>
            Next
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Booking;
