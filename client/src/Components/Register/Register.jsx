import { Button, Empty, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { postAxiosCall } from "../../Axios/UniversalAxiosCalls";

function Register(props) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);

  const goToLogin = async () => {
    navigateTo("/");
  };

  const onRegister = async () => {
    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      hashedPassword: password,
    };
    try {
      const response = await postAxiosCall("/signup", data);
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error,
        icon: "error",
        confirmButtonText: "Ok!",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "500px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-3xl mb-4 font-semibold">Register</div>
        <div className="credentials card shadow-lg">
          <div className="FName my-4">
            <div className="text-xl w-full my-2 font-medium">First Name</div>
            <Input
              placeholder="First Name"
              type="text"
              size="large"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="LName my-4">
            <div className="text-xl w-full my-2 font-medium">Last Name</div>
            <Input
              placeholder="Last Name"
              type="text"
              size="large"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="Email my-4">
            <div className="text-xl w-full my-2 font-medium">Email</div>
            <Input
              placeholder="Email"
              type="text"
              size="large"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password my-4">
            <div className="text-xl my-2 font-medium">Password</div>
            <Input
              placeholder="Password"
              type="password"
              size="large"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-around items-center flex-row">
            <Button
              type="primary"
              className="text-black"
              size="large"
              onClick={onRegister}
            >
              Register
            </Button>
            <Button type="dashed" size="large" onClick={goToLogin}>
              Already Have Account? Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (sendUserInfo) =>
      dispatch({ type: "LOGGEDIN", payload: sendUserInfo }),
  };
};

export default connect(null, mapDispatchToProps)(Register);
