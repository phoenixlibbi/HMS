import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink } from "react-router-dom";

function SideNavBar() {
  return (
    <CDBSidebar
      textColor="#fff"
      backgroundColor="#333"
    >
      <CDBSidebarHeader>
        <Link
          to="/"
          className="text-decoration-none"
          style={{ color: "inherit" }}
        >
          HMS
        </Link>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink to="/">
            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          {/* <NavLink to="/book_appointment">
            <CDBSidebarMenuItem icon="user">
              Book Appointment
            </CDBSidebarMenuItem>
          </NavLink> */}
          <NavLink to="/employee">
            <CDBSidebarMenuItem icon="user">Employee</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/doctor">
            <CDBSidebarMenuItem icon="user">Doctor</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/nurse">
            <CDBSidebarMenuItem icon="user">Nurse</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/patient">
            <CDBSidebarMenuItem icon="user">Patient</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/medicine">
            <CDBSidebarMenuItem icon="pills">Medicine</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/test">
            <CDBSidebarMenuItem icon="file">Tests</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/bills">
            <CDBSidebarMenuItem icon="chart-line">Bills</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "20px 5px",
          }}
        >
          HMS
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}

export default SideNavBar;
