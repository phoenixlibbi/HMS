import React from "react";
import { useState } from "react";
import { Col,Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import F1 from "../media/LeftFace.png";
import F2 from "../media/RightFace.png";
import F3 from "../media/LeftCloseFace.png";
import F4 from "../media/RightCloseFace.png";

const Login = ({setLogged}) => {
    const navigate = useNavigate();
  const [inputtext, setinputtext] = useState({
    user: "",
    password: "",
  });

  const [warnuser, setwarnuser] = useState(false);
  const [warnpassword, setwarnpassword] = useState(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);
  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };
  const bgIMG = {
    backgroundImage: eye ? `url(${F1}), url(${F2})` : `url(${F3}), url(${F4})`,
  };
  const submitForm = (e) => {
    e.preventDefault();
    setwarnuser(false);
    setwarnpassword(false);
    if (inputtext.user === "admin") {
      if (inputtext.password === "2021se7") {
        navigate("/");
        setLogged(true); 
      } else {
        setwarnpassword(true);
      }
    } else {
      setwarnuser(true);
    }
  };

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };
  return (
    <Row style={{overflow:"hidden",height:"820px",paddingTop:"180px",backgroundColor:"#e2252b"}}>
    <Col md={{ span: 6, offset: 3 }} className="mini-content" style={bgIMG}>
      <Col md={{ span: 8, offset: 2 }}>
      <h5 style={{fontSize:"27px",fontWeight:"400"}}>Login Form</h5>
        <form onSubmit={submitForm}>
          <div className="input-text">
            <input
              type="text"
              className={` ${warnuser ? "warning" : ""}`}
              placeholder="Enter Your User Name"
              value={inputtext.user}
              onChange={inputEvent}
              name="user"
            />
            <i className="fa fa-user fa-user1"></i>
          </div>
          <div className="input-text">
            <input
              type={password}
              className={` ${warnpassword ? "warning" : ""} ${
                type ? "type_password" : ""
              }`}
              placeholder="Enter Your Password"
              value={inputtext.password}
              onChange={inputEvent}
              name="password"
            />
            <i className="fa fa-lock"></i>
            <i
              onClick={Eye}
              className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </div>
          <div className="buttons">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </Col>
    </Col>
    </Row>
  );
};

export default Login;
