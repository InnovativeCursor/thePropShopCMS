import { Button, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setAuthenticationHeader } from "../../utils/Authenticate";
import { connect } from "react-redux";
import { postAxiosCall } from "../../Axios/UniversalAxiosCalls";
import CryptoJS from "crypto-js";

function Login(props) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onRegister = async () => {
    navigateTo("/register");
  };

  const onLogin = async () => {
    try {
      const encryptedEmail = CryptoJS.AES.encrypt(
        email,
        process.env.REACT_APP_ENCRYPTION
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.REACT_APP_ENCRYPTION
      ).toString();
      const answer = await postAxiosCall("/login", {
        encryptedEmail,
        encryptedPassword,
      });
      if (answer) {
        localStorage.setItem("access_token", answer?.token);
        props.isLoggedIn(answer?.sendUserInfo);
        navigateTo("/home");
      } else {
        ("error");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonText: "Alright!",
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
          width: "80%", // Adjust the width as needed
          maxWidth: "500px", // Maximum width of the rectangular shape
          padding: "20px", // Add padding for content spacing
          backgroundColor: "#f0f0f0", // Background color of the login form
          borderRadius: "8px", // Add border-radius for rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add box-shadow for a subtle elevation effect
        }}
      >
        <div className="text-3xl mb-4 font-semibold">Login</div>
        <div className="credentials card shadow-lg">
          <div className="uName my-4">
            <div className="text-xl w-full my-2 font-medium">Email</div>
            <Input
              placeholder="User Name"
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
              onClick={onLogin}
            >
              Login
            </Button>
            <Button type="dashed" size="large" onClick={onRegister}>
              Register
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

export default connect(null, mapDispatchToProps)(Login);
