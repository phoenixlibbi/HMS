import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import { Container, Row, Col } from "react-bootstrap";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Nurse from "./pages/Nurse";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import Test from "./pages/Test";
import Medicine from "./pages/Medicine";
import Login from "./pages/Login";
import Bills from "./pages/Bills";
// import BookAppointment from "./pages/BookAppointment";

function App() {
  const [logged,setLogged]=useState(true)
  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid>
          <Row>
            {!logged?<Login setLogged={setLogged}/>:
            <Col style={{ padding: "0px", minHeight: "800px" }}>
              <SideNavBar style={{ float: 'left' }} />
              <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard/>} />
                {/* <Route path="/book_appointment" element={<BookAppointment/>} /> */}
                <Route path="/employee" element={<Employee />} />
                <Route path="/doctor" element={<Doctor/>} />
                <Route path="/nurse" element={<Nurse/>} />
                <Route path="/patient" element={<Patient/>} />
                <Route path="/test" element={<Test/>} />
                <Route path="/medicine" element={<Medicine/>} />
                <Route path="/bills" element={<Bills/>} />
              </Routes>
              </div>
            </Col>
            }
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}
export default App;
